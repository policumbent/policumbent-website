const fetchFromDato = require('./api')


module.exports = async function getPrototypePage() {

  const query = `query {
    prototypesPage{
      title_it: title(locale: it),
      title_en: title(locale: en),
      introText_it: introText(locale: it),
      introText_en: introText(locale: en)
    }
  }`

  const response = await fetchFromDato(query);
  
  const prototypePage = {
    it: {
      title: response.data.prototypesPage.title_it,
      introText: response.data.prototypesPage.introText_it
    },
    en: {
      title: response.data.prototypesPage.title_en,
      introText: response.data.prototypesPage.introText_en
    },
  }
  
  return prototypePage;
}