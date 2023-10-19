const fetchFromDato = require('./api')


module.exports = async function getAllSponsors() {

  let sponsors = [];

  const query = `query allSponsors {
    allSponsors(orderBy: position_ASC, filter: {_status: {eq: published}}, first: "30") {
      id
      name
      description_it: description(locale: it)
      description_en: description(locale: en)
      logo {
        url
      }
      image {
        url
      }
      website
    }
  }`;

                  
  const response = await fetchFromDato(query);
  sponsors = sponsors.concat(response.data.allSponsors);

  // format sponsors objects
  const sponsorsFormatted = sponsors.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      logo: item.logo,
      website: item.website,
      description_it: item.description_it,
      description_en: item.description_en
    };
  });

  // return formatted sponsors
  return sponsorsFormatted;
}
