// Code source:
// https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/

// required packages
const fetch = require("node-fetch");

// DatoCMS token
const token = process.env.DATO_CMS_TOKEN;

// get departments
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllDepartments() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // departments array
  let departments = [];

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
          query: `query allDepartments {
              allDepartments(first: ${recordsPerQuery}, skip: ${recordsToSkip}, orderBy: position_ASC, filter: {_status: {eq: published}}) {
                id
                name_it: name(locale: it)
                name_en: name(locale: en)
                members {
                  surname
                  name
                  role_it: role(locale: it)
                  role_en: role(locale: en)
                  photo {
                    title
                    url
                  }
                  url
                  urlText
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

      // update departments array with the data from the JSON response
      departments = departments.concat(response.data.allDepartments);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.allDepartments.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // format departments objects
  const departmentsFormatted = departments.map((item) => {
    return {
      id: item.id,
      name_it: item.name_it,
      name_en: item.name_en,
      members: item.members
    };
  });

  // return formatted departments
  return departmentsFormatted;
}

// export for 11ty
module.exports = getAllDepartments;