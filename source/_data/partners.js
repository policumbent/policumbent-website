// Code source:
// https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/

// required packages
const fetch = require("node-fetch");

// DatoCMS token
const token = process.env.DATO_CMS_TOKEN;

// get partners
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllPartners() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // partners array
  let partners = [];

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
          query: `query allPartners {
            allPartners(first: ${recordsPerQuery}, skip: ${recordsToSkip}, orderBy: position_ASC, filter: {_status: {eq: published}}) {
              id
              name
              website
              logo {
                url
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

      // update partners array with the data from the JSON response
      partners = partners.concat(response.data.allPartners);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.allPartners.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

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

// export for 11ty
module.exports = getAllPartners;