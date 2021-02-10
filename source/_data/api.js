const fetch = require("node-fetch");
const token = process.env.DATO_CMS_TOKEN;

module.exports = async function fetchFromDato(query) {
    if (!query) return;
    try{
        const dato = await fetch("https://graphql.datocms.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
                body: JSON.stringify({
                query: query
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

        return response;

    } catch (error) {
      throw new Error(error);
    }
}