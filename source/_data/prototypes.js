// Code source:
// https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/

// required packages
const fetch = require("node-fetch");

// DatoCMS token
const token = process.env.DATO_CMS_TOKEN;

// get prototypes
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllPrototypes() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // prototypes array
  let prototypes = [];

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
          query: `query MyQuery {
            allPrototypes(first: ${recordsPerQuery}, skip: ${recordsToSkip}, orderBy: position_ASC, filter: {_status: {eq: published}}) {
              id
              slug
              name
              season
              speed
              features_it: features(locale: it)
              features_en: features(locale: en)
              history_it: history(locale: it)
              history_en: history(locale: en)
              gallery {
                preview: url(imgixParams: {fm: jpg, w: 300, h:300, fit: crop})
                url
                alt
              }
              image {
                alt
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

      // update blogpost array with the data from the JSON response
      prototypes = prototypes.concat(response.data.allPrototypes);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.allPrototypes.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // format prototypes objects
  const prototypesFormatted = prototypes.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      speed: item.speed,
      season: item.season,
      image: {
        url: item.image.url,
        alt: item.image.alt
      },
      features_it: item.features_it,
      features_en: item.features_en,
      history_it: item.history_it,
      history_en: item.history_en,
      gallery: item.gallery
    };
  });

  // return formatted prototypes
  return prototypesFormatted;
}

// export for 11ty
module.exports = getAllPrototypes;