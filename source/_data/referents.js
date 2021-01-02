// Code source:
// https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/

// required packages
const fetch = require("node-fetch");

// DatoCMS token
const token = process.env.DATO_CMS_TOKEN;

// get referents
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllReferents() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // referents array
  let referents = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    try {
      // initiate fetch
      const dato = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `query allReferents {
            allReferents(first: ${recordsPerQuery}, skip: ${recordsToSkip}, orderBy: position_ASC, filter: {_status: {eq: published}}) {
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
          }`
        })
      });

      // store the JSON response when promise resolves
      const response = await dato.json();

      // handle DatoCMS errors
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("Aborting: DatoCMS errors");
      }

      // update referents array with the data from the JSON response
      referents = referents.concat(response.data.allReferents);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.allReferents.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

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

// export for 11ty
module.exports = getAllReferents;