const fetchFromDato = require('./api')


module.exports = async function getWhpscPage() {

    const query = `query {
      whpscPage (locale: %LOCALE%){
        title
        introText
        image{
          responsiveImage(
              sizes: "(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1200px",
              imgixParams: {fm: jpg, fit: crop, w: 1200, h: 500 }
            ){
            ...responsiveImageFragment
          }
        }
        og_image: image{
          url(imgixParams: {fm: jpg, fit: crop, w: 1200, h: 630 })
        }
        raceTitle
        raceIntroText
        raceParts{
          name
          description
          image{
            url
            alt
          }
        }
        resultsTitle
        resultsIntroText
        raceEditions{
          title
          text
          gallery{
            url
            alt
          }
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
      base64
  }`



  const response_it = await fetchFromDato(query.replace('%LOCALE%', 'it'));
  const response_en = await fetchFromDato(query.replace('%LOCALE%', 'en'));
  
  const whpscPage = {
    it: response_it.data.whpscPage,
    en: response_en.data.whpscPage
  }
  
  return whpscPage;
}