// Code source:
// https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/

// required packages
const fetch = require("node-fetch");

// DatoCMS token
const token = process.env.DATO_CMS_TOKEN;

// get sponsors
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllSponsors() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // sponsors array
  let sponsors = [];

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
          query: `query allSponsors {
            allSponsors(first: ${recordsPerQuery}, skip: ${recordsToSkip}, orderBy: position_ASC, filter: {_status: {eq: published}}) {
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

      // update sponsors array with the data from the JSON response
      sponsors = sponsors.concat(response.data.allSponsors);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.allSponsors.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

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

// export for 11ty
module.exports = getAllSponsors;