export default {
  async beforeCreate(event) {
    const { data } = event.params;
    console.log('beforeCreate', data);
if(data.publishedAt && data.includeInPageDirectory) {
    const createdPage = await strapi.service('api::page.page').create({
      data: {
        title: data.title,
        slug: data.slug,
        cta: {
          text: data.title,
          href: data.slug,
          target: '_self',
        },
      },
    });
    console.log('createdPage', createdPage);
    }
  },
};