const fetchFromDato = require('./api')


module.exports = async function getAllArticles() {

  // articles array
  let articles = [];
  
  const query = `query allArticles {
    allArticles(orderBy: date_DESC, filter: {_status: {eq: published}}) {
        id
        date
        imagePreview: image {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 600}) {
            src
          }
        }
        image {
          responsiveImage(
            sizes: "(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1440px",
            imgixParams: {fm: jpg, fit: crop, w: 1200, h: 500 }
          ) {
            srcSet             # <- HTML5 src/srcset/sizes attributes
            webpSrcSet         #
            sizes              #
            src                #
            width              # <- size information
            height             #
            aspectRatio        #
            alt                # <- SEO attributes
            bgColor            # <- background color placeholder
            base64             # <- blur-up placeholder, base64-encoded JPEG
          }
        }
        title_it: title(locale: it)
        title_en: title(locale: en)
        slug_it: slug(locale: it)
        slug_en: slug(locale: en)
        seo_it: seo(locale: it) {
          ...seoFields
        }
        seo_en: seo(locale: en) {
          ...seoFields
        }
        content_it: content(locale: it)
        content_en: content(locale: en)
    }
  }
  
  fragment seoFields on SeoField {
    title
    description
    image {
      alt
      url
    }
    twitterCard
  }`;

  const response = await fetchFromDato(query);
  
  articles = articles.concat(response.data.allArticles);

  // format articles objects
  const articlesFormatted = articles.map((item) => {
    return {
      id: item.id,
      date: item.date,
      image: item.image.responsiveImage,
      image_preview: item.imagePreview.responsiveImage,
      title_en: item.title_en,
      title_it: item.title_it,
      slug_en: item.slug_en,
      slug_it: item.slug_it,
      seo_en: item.seo_en,
      seo_it: item.seo_it,
      content_en: item.content_en,
      content_it: item.content_it
    };
  });

  // return formatted articles
  return articlesFormatted;
}