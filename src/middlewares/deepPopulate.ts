/**
 * `deepPopulate` middleware
 *
 * Builds a populate query from each content-type schema and reorders
 * response fields to match schema attribute order.
 */

import type { Core } from '@strapi/strapi';
import { UID } from '@strapi/types';
import { contentTypes } from '@strapi/utils';

const API_PATH = /^\/api\/([^/?]+)/;
const MEDIA_FIELDS = ['id', 'name', 'url', 'alternativeText'];
const META_FIELDS = ['id', '__component', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale'];

type SchemaUid = UID.Schema | UID.Component;
type PopulateValue =
  | boolean
  | { populate?: PopulateObject; fields?: string[]; on?: Record<string, PopulateValue> };
type PopulateObject = Record<string, PopulateValue>;

const resolveContentTypeUid = (strapi: Core.Strapi, pathSegment: string): UID.Schema | null => {
  for (const uid of Object.keys(strapi.contentTypes)) {
    if (!uid.startsWith('api::')) continue;

    const { singularName, pluralName } = strapi.contentTypes[uid].info;
    if (pathSegment === singularName || pathSegment === pluralName) {
      return uid as UID.Schema;
    }
  }

  return null;
};

const buildPopulate = (
  strapi: Core.Strapi,
  uid: SchemaUid,
  depth: number,
  maxDepth: number,
  visited: Set<string>
): PopulateObject => {
  if (depth >= maxDepth) return {};

  const uidKey = String(uid);
  if (visited.has(uidKey)) return {};

  const model = strapi.getModel(uid);
  if (!model?.attributes) return {};

  const branchVisited = new Set(visited);
  branchVisited.add(uidKey);

  return Object.entries(model.attributes).reduce<PopulateObject>((acc, [name, attribute]) => {
    const attr = attribute as {
      type?: string;
      relation?: string;
      target?: UID.Schema;
      component?: UID.Component;
      components?: UID.Component[];
    };

    switch (attr.type) {
      case 'relation': {
        if (attr.relation?.toLowerCase().startsWith('morph')) break;
        if (!contentTypes.isVisibleAttribute(model, name)) break;

        const nested = attr.target
          ? buildPopulate(strapi, attr.target, depth + 1, maxDepth, branchVisited)
          : {};

        acc[name] = Object.keys(nested).length > 0 ? { populate: nested } : true;
        break;
      }

      case 'media':
        acc[name] = { fields: MEDIA_FIELDS };
        break;

      case 'component': {
        const nested = buildPopulate(strapi, attr.component!, depth + 1, maxDepth, branchVisited);
        acc[name] = Object.keys(nested).length > 0 ? { populate: nested } : true;
        break;
      }

      case 'dynamiczone':
        acc[name] = {
          on: (attr.components || []).reduce<Record<string, PopulateValue>>((onAcc, componentUid) => {
            const nested = buildPopulate(strapi, componentUid, depth + 1, maxDepth, branchVisited);
            onAcc[componentUid] = Object.keys(nested).length > 0 ? { populate: nested } : true;
            return onAcc;
          }, {}),
        };
        break;
    }

    return acc;
  }, {});
};

const reorderNestedValue = (
  strapi: Core.Strapi,
  attr: { type?: string; component?: UID.Component; target?: UID.Schema },
  value: unknown
): unknown => {
  if (value == null || typeof value !== 'object') return value;

  if (attr.type === 'component') {
    return Array.isArray(value)
      ? value.map((item) => reorderEntry(strapi, attr.component!, item as Record<string, unknown>))
      : reorderEntry(strapi, attr.component!, value as Record<string, unknown>);
  }

  if (attr.type === 'relation' && attr.target) {
    return Array.isArray(value)
      ? value.map((item) => reorderEntry(strapi, attr.target!, item as Record<string, unknown>))
      : reorderEntry(strapi, attr.target, value as Record<string, unknown>);
  }

  if (attr.type === 'dynamiczone' && Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === 'object' && '__component' in item) {
        const componentUid = (item as { __component: UID.Component }).__component;
        return reorderEntry(strapi, componentUid, item as Record<string, unknown>);
      }
      return item;
    });
  }

  return value;
};

const reorderEntry = (
  strapi: Core.Strapi,
  uid: SchemaUid,
  entry: Record<string, unknown>
): Record<string, unknown> => {
  const model = strapi.getModel(uid);
  if (!model?.attributes) return entry;

  const result: Record<string, unknown> = {};

  for (const key of META_FIELDS) {
    if (key in entry) result[key] = entry[key];
  }

  for (const key of Object.keys(model.attributes)) {
    if (!(key in entry)) continue;

    const attr = model.attributes[key] as {
      type?: string;
      component?: UID.Component;
      target?: UID.Schema;
    };

    result[key] = reorderNestedValue(strapi, attr, entry[key]);
  }

  for (const key of Object.keys(entry)) {
    if (key in result) continue;

    if (key === 'localizations' && Array.isArray(entry[key])) {
      result[key] = (entry[key] as Record<string, unknown>[]).map((item) =>
        reorderEntry(strapi, uid, item)
      );
      continue;
    }

    result[key] = entry[key];
  }

  return result;
};

const reorderResponse = (strapi: Core.Strapi, uid: UID.Schema, data: unknown): unknown => {
  if (data == null) return data;

  if (Array.isArray(data)) {
    return data.map((item) => reorderEntry(strapi, uid, item as Record<string, unknown>));
  }

  return reorderEntry(strapi, uid, data as Record<string, unknown>);
};

export default (_config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    const isApiGet =
      ctx.request.method === 'GET' &&
      ctx.request.url.startsWith('/api/') &&
      !ctx.request.url.includes('/api/seo');

    const pathSegment = ctx.request.url.match(API_PATH)?.[1];
    const uid = pathSegment ? resolveContentTypeUid(strapi, pathSegment) : null;

    if (isApiGet && uid && !ctx.query.populate) {
      try {
        const requestedDepth = Number(ctx.query.populateDepth) || 15;
        const maxDepth = Math.min(Math.max(1, requestedDepth), 15);
        const populate = buildPopulate(strapi, uid, 0, maxDepth, new Set());

        const model = strapi.getModel(uid);
        const hasLocalizations = (model?.pluginOptions as { i18n?: { localized?: boolean } })?.i18n?.localized;

        ctx.query.populate = {
          ...populate,
          ...(!ctx.request.url.includes('products') && hasLocalizations && {
            localizations: { populate: {} },
          }),
        };
      } catch (error) {
        strapi.log.error('Error in deepPopulate middleware:', error);
      }
    }

    await next();

    if (isApiGet && uid && ctx.body?.data != null) {
      ctx.body.data = reorderResponse(strapi, uid, ctx.body.data);
    }
  };
};
