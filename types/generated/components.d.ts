import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksContentList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_content_lists';
  info: {
    displayName: 'Content List';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    cta: Schema.Attribute.Component<'elements.link', false>;
    dinings: Schema.Attribute.Relation<'oneToMany', 'api::dining.dining'>;
    events: Schema.Attribute.Relation<'oneToMany', 'api::event.event'>;
    itemType: Schema.Attribute.Enumeration<['events', 'dining']> &
      Schema.Attribute.DefaultTo<'events'>;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksEnquiryForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_enquiry_forms';
  info: {
    displayName: 'Enquiry Form';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    cta: Schema.Attribute.Component<'elements.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    faq: Schema.Attribute.Component<'elements.faq', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFeatureContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_contents';
  info: {
    displayName: 'Feature Content';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    cta: Schema.Attribute.Component<'elements.link', true>;
    description: Schema.Attribute.Blocks;
    infoSummary: Schema.Attribute.Component<'elements.meta', false>;
    infoTitle: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metaData: Schema.Attribute.Component<'elements.meta', true>;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFeaturedEvents extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_events';
  info: {
    displayName: 'Featured Events';
  };
  attributes: {
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHeading extends Struct.ComponentSchema {
  collectionName: 'components_blocks_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    isHeroSlide: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    media: Schema.Attribute.Relation<
      'oneToMany',
      'api::hero-carousel.hero-carousel'
    >;
    slideInterval: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 3;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
  };
}

export interface BlocksImageContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_contents';
  info: {
    displayName: 'Image Content';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Blocks;
    isReversed: Schema.Attribute.Boolean;
    listItems: Schema.Attribute.Component<'elements.copy-section', true>;
    listTitle: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    preTitle: Schema.Attribute.String;
    showListItems: Schema.Attribute.Boolean;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksImageContentCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_content_cards';
  info: {
    displayName: 'Image Content Card';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    infoTitle: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metaData: Schema.Attribute.Component<'elements.meta', true>;
    preTitle: Schema.Attribute.String;
    services: Schema.Attribute.Component<'elements.section-intro', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksImageFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_feature_grids';
  info: {
    displayName: 'Image Feature Grid';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'elements.feature-cards', true>;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksMap extends Struct.ComponentSchema {
  collectionName: 'components_blocks_maps';
  info: {
    displayName: 'Map';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    coordinates: Schema.Attribute.Component<'elements.coordinates', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksNewsLetterSignup extends Struct.ComponentSchema {
  collectionName: 'components_blocks_news_letter_signups';
  info: {
    displayName: 'News Letter Signup';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    privacyText: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPricingSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricing_sections';
  info: {
    displayName: 'Pricing Section';
  };
  attributes: {
    pricing: Schema.Attribute.Component<'elements.pricing-plan', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksScheduleDetails extends Struct.ComponentSchema {
  collectionName: 'components_blocks_schedule_details';
  info: {
    displayName: 'Schedule Details';
  };
  attributes: {
    scheduleItems: Schema.Attribute.Component<'elements.schedule-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSectionIntro extends Struct.ComponentSchema {
  collectionName: 'components_blocks_section_intros';
  info: {
    displayName: 'Section Intro';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    infoItems: Schema.Attribute.Component<'elements.section-intro', true>;
  };
}

export interface BlocksSplitContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_split_contents';
  info: {
    displayName: 'Split Content';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    items: Schema.Attribute.Component<'elements.split-content-item', true>;
    media: Schema.Attribute.Media<'images'>;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSplitEnquiryContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_split_enquiry_contents';
  info: {
    displayName: 'Split Enquiry Content';
  };
  attributes: {
    advantages: Schema.Attribute.Component<'elements.section-intro', true>;
    advantagesPreTitle: Schema.Attribute.String;
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    description: Schema.Attribute.Text;
    form: Schema.Attribute.Component<'blocks.enquiry-form', false> &
      Schema.Attribute.Required;
    quote: Schema.Attribute.Component<'elements.quote', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSplitGridContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_split_grid_contents';
  info: {
    displayName: 'Split Grid Content';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    cta: Schema.Attribute.Component<'elements.link', true>;
    description: Schema.Attribute.Text;
    isCtaRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    items: Schema.Attribute.Component<'elements.feature-cards', true>;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTeamGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_team_grids';
  info: {
    displayName: 'Team Grid';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false>;
    description: Schema.Attribute.Text;
    members: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-member.team-member'
    >;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_blocks';
  info: {
    displayName: 'Text Block';
  };
  attributes: {
    appearance: Schema.Attribute.Component<'elements.appearance', false> &
      Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'elements.link', true>;
    description: Schema.Attribute.Text;
    isCtaRequired: Schema.Attribute.Boolean;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsAppearance extends Struct.ComponentSchema {
  collectionName: 'components_elements_appearances';
  info: {
    displayName: 'Appearance';
    icon: 'brush';
  };
  attributes: {
    bgColor: Schema.Attribute.Enumeration<['white', 'stone', 'grey', 'green']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'white'>;
    isVisible: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    paddingBottom: Schema.Attribute.Enumeration<
      [
        'space_0',
        'space_32',
        'space_64',
        'space_72',
        'space_80',
        'space_96',
        'space_128',
        'space_160',
        'space_192',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'space_96'>;
    paddingTop: Schema.Attribute.Enumeration<
      [
        'space_0',
        'space_32',
        'space_64',
        'space_72',
        'space_80',
        'space_96',
        'space_128',
        'space_160',
        'space_192',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'space_0'>;
  };
}

export interface ElementsCoordinates extends Struct.ComponentSchema {
  collectionName: 'elements_coordinates';
  info: {
    displayName: 'Coordinates';
  };
  attributes: {
    latitude: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 90;
          min: -90;
        },
        number
      >;
    longitude: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 180;
          min: -180;
        },
        number
      >;
  };
}

export interface ElementsCopySection extends Struct.ComponentSchema {
  collectionName: 'components_elements_copy_sections';
  info: {
    displayName: 'Copy Section';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface ElementsDetailsSection extends Struct.ComponentSchema {
  collectionName: 'components_elements_details_sections';
  info: {
    displayName: 'Details Section';
  };
  attributes: {
    detailItem: Schema.Attribute.Component<'blocks.featured-events', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFaq extends Struct.ComponentSchema {
  collectionName: 'components_elements_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ElementsFeatureCards extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_cards';
  info: {
    displayName: 'Feature Cards';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsGeneralCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_general_cards';
  info: {
    displayName: 'General Card';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['dining', 'event', 'service', 'shop']
    > &
      Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.String;
    dinings: Schema.Attribute.Relation<'oneToMany', 'api::dining.dining'>;
    events: Schema.Attribute.Relation<'oneToMany', 'api::event.event'>;
    preTitle: Schema.Attribute.String;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    shops: Schema.Attribute.Relation<'oneToMany', 'api::shop.shop'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    showIcon: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    > &
      Schema.Attribute.Required;
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
        minLength: 1;
      }>;
  };
}

export interface ElementsMeta extends Struct.ComponentSchema {
  collectionName: 'components_elements_metas';
  info: {
    displayName: 'meta';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface ElementsPricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_elements_pricing_plans';
  info: {
    displayName: 'Pricing Plan';
  };
  attributes: {
    badge: Schema.Attribute.String;
    cta: Schema.Attribute.Component<'elements.link', false>;
    duration: Schema.Attribute.String;
    features: Schema.Attribute.Component<'elements.copy-section', true>;
    price: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsQuote extends Struct.ComponentSchema {
  collectionName: 'components_elements_quotes';
  info: {
    displayName: 'Quote';
  };
  attributes: {
    attribution: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ElementsScheduleItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_schedule_items';
  info: {
    displayName: 'Schedule Item';
  };
  attributes: {
    time: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsSectionIntro extends Struct.ComponentSchema {
  collectionName: 'components_elements_section_intros';
  info: {
    displayName: 'Section Intro';
  };
  attributes: {
    description: Schema.Attribute.Text;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsSplitContentItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_split_content_items';
  info: {
    displayName: 'Split Content Item';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    listItems: Schema.Attribute.Component<'elements.meta', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTextModule extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_modules';
  info: {
    displayName: 'Text Module';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', true>;
    description: Schema.Attribute.String;
    preTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.content-list': BlocksContentList;
      'blocks.enquiry-form': BlocksEnquiryForm;
      'blocks.faq': BlocksFaq;
      'blocks.feature-content': BlocksFeatureContent;
      'blocks.featured-events': BlocksFeaturedEvents;
      'blocks.heading': BlocksHeading;
      'blocks.hero': BlocksHero;
      'blocks.image-content': BlocksImageContent;
      'blocks.image-content-card': BlocksImageContentCard;
      'blocks.image-feature-grid': BlocksImageFeatureGrid;
      'blocks.map': BlocksMap;
      'blocks.news-letter-signup': BlocksNewsLetterSignup;
      'blocks.pricing-section': BlocksPricingSection;
      'blocks.schedule-details': BlocksScheduleDetails;
      'blocks.section-intro': BlocksSectionIntro;
      'blocks.split-content': BlocksSplitContent;
      'blocks.split-enquiry-content': BlocksSplitEnquiryContent;
      'blocks.split-grid-content': BlocksSplitGridContent;
      'blocks.team-grid': BlocksTeamGrid;
      'blocks.text-block': BlocksTextBlock;
      'elements.appearance': ElementsAppearance;
      'elements.coordinates': ElementsCoordinates;
      'elements.copy-section': ElementsCopySection;
      'elements.details-section': ElementsDetailsSection;
      'elements.faq': ElementsFaq;
      'elements.feature-cards': ElementsFeatureCards;
      'elements.general-card': ElementsGeneralCard;
      'elements.link': ElementsLink;
      'elements.meta': ElementsMeta;
      'elements.pricing-plan': ElementsPricingPlan;
      'elements.quote': ElementsQuote;
      'elements.schedule-item': ElementsScheduleItem;
      'elements.section-intro': ElementsSectionIntro;
      'elements.split-content-item': ElementsSplitContentItem;
      'elements.text-module': ElementsTextModule;
    }
  }
}
