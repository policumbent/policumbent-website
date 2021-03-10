const fetchFromDato = require('./api')


module.exports = async function getTeamPage() {

  const query = `query {
    teamPage{
      title_it: title(locale: it),
      title_en: title(locale: en),
      introText_it: introText(locale: it),
      introText_en: introText(locale: en),
      image_alt_it: image(locale: it){
        alt
      }
      image_alt_en: image(locale: en){
        alt
      }
      image {
        responsiveImage(
          sizes: "(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1440px",
          imgixParams: {fm: jpg, fit: crop, w: 1200, h: 500 }
        ){
        	...responsiveImageFragment
        }
      }
      og_image: image{
        url(imgixParams: {fm: jpg, fit: crop, w: 1200, h: 630 })
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
  
  const teamPage = {
    it: {
      title: response.data.teamPage.title_it,
      introText: response.data.teamPage.introText_it,
      image_alt: response.data.teamPage.image_alt_it
    },
    en: {
      title: response.data.teamPage.title_en,
      introText: response.data.teamPage.introText_en,
      image_alt: response.data.teamPage.image_alt_en
    },
    image: response.data.teamPage.image.responsiveImage,
    og_image: response.data.teamPage.og_image
  }
  
  return teamPage;
}