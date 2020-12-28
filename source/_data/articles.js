// Code source:
// https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/

// required packages
const fetch = require("node-fetch");

// DatoCMS token
const token = process.env.DATO_CMS_TOKEN;

// get articles
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllArticles() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // articles array
  let articles = [];

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
          query: `query allArticles {
            allArticles(first: ${recordsPerQuery}, skip: ${recordsToSkip}, orderBy: date_DESC, filter: {_status: {eq: published}}) {
                id
                date
                image {
                  alt
                  url
                }
                title_it: title(locale: it)
                title_en: title(locale: en)
                slug_it: slug(locale: it)
                slug_en: slug(locale: en)
                seo_it: seo(locale: it) {
                  ...seoFields
                }
                seo_en: seo(locale: en) {
                  ...seoFields
                }
                content_it: content(locale: it)
                content_en: content(locale: en)
            }
          }
          
          fragment seoFields on SeoField {
            title
            description
            image {
              alt
              url
            }
            twitterCard
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
      articles = articles.concat(response.data.allArticles);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.allArticles.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // format articles objects
  const articlesFormatted = articles.map((item) => {
    return {
      id: item.id,
      date: item.date,
      image: {
        url: item.image.url,
        alt: item.image.alt,
      },
      title_en: item.title_en,
      title_it: item.title_it,
      slug_en: item.slug_en,
      slug_it: item.slug_it,
      seo_en: item.seo_en,
      seo_it: item.seo_it,
      content_en: item.content_en,
      content_it: item.content_it
    };
  });

  // return formatted articles
  return articlesFormatted;
}

// export for 11ty
module.exports = getAllArticles;