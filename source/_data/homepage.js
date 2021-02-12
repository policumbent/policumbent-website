const fetchFromDato = require('./api')


module.exports = async function getHomePage() {

  const query = `query  {
    homepage(locale: %LOCALE%){
    	teamTitle
    	teamDescription
    	teamImage {
    	  url: url(imgixParams: {fm: jpg, w: 1000})
        alt
    	}
    	teamButtonText
  }
}`

  const response_it = await fetchFromDato(query.replace('%LOCALE%', 'it'));
  const response_en = await fetchFromDato(query.replace('%LOCALE%', 'en'));
  
  const homepage = {
    it: response_it.data.homepage,
    en: response_en.data.homepage
  }
  
  return homepage;
}