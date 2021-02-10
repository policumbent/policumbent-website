
const fetchFromDato = require('./api')


module.exports = async function getAllPartners() {

  // partners array
  let partners = [];

  const query = `query allPartners {
    allPartners(orderBy: position_ASC, filter: {_status: {eq: published}}) {
      id
      name
      website
      logo {
        url
      }
    }
  }`

  const response = await fetchFromDato(query);

  partners = partners.concat(response.data.allPartners);

  // format partners objects
  const partnersFormatted = partners.map((item) => {
    return {
      id: item.id,
      name: item.name,
      logo: item.logo,
      website: item.website
    };
  });

  // return formatted partners
  return partnersFormatted;
}