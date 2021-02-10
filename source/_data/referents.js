const fetchFromDato = require('./api')


module.exports = async function getAllReferents() {

  let referents = [];
  const query = `query allReferents {
    allReferents(orderBy: position_ASC, filter: {_status: {eq: published}}) {
      id
      name
      role_it: role(locale: it)
      role_en: role(locale: en)
      image {
        url
      }
      contacts_it: contacts(locale: it) {
        contactToShow
        contactType
        contactUrl
      }
      contacts_en: contacts(locale: en) {
        contactToShow
        contactType
        contactUrl
      }
    }
  }`;

  const response = await fetchFromDato(query);
  referents = referents.concat(response.data.allReferents);

  // format referents objects
  const referentsFormatted = referents.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      role_it: item.role_it,
      role_en: item.role_en,
      contacts_it: item.contacts_it,
      contacts_en: item.contacts_en
    };
  });

  // return formatted referents
  return referentsFormatted;
}