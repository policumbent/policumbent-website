const fetchFromDato = require('./api')


module.exports = async function getAllPrototypes() {

  let prototypes = [];

  const query = `query {
    allPrototypes(orderBy: position_ASC, filter: {_status: {eq: published}}) {
      id
      slug
      name
      season
      speed
      features_it: features(locale: it)
      features_en: features(locale: en)
      history_it: history(locale: it)
      history_en: history(locale: en)
      gallery {
        preview: url(imgixParams: {fm: jpg, w: 300, h:300, fit: crop})
        url
        alt
      }
      image {
        preview: url(imgixParams: {fm: jpg, w: 800, h:800, fit: crop})
        alt
        responsiveImage(
          sizes: "(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1440px",
          imgixParams: {fm: jpg, fit: crop, w: 1200, h: 900 }
        ){
        	...responsiveImageFragment
        }
        url
      }
    }
  }
  
fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
}`

  const response = await fetchFromDato(query);
  
  prototypes = prototypes.concat(response.data.allPrototypes);
  
  const prototypesFormatted = prototypes.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      speed: item.speed,
      season: item.season,
      image: {
        url: item.image.url,
        responsiveImage: item.image.responsiveImage,
        preview: item.image.preview,
        alt: item.image.alt
      },
      features_it: item.features_it,
      features_en: item.features_en,
      history_it: item.history_it,
      history_en: item.history_en,
      gallery: item.gallery
    };
  });

  // return formatted prototypes
  return prototypesFormatted;
}