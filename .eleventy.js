require('dotenv').config();
const i18n = require('eleventy-plugin-i18n');
const translations = require('./source/_data/translations.js');
const fs = require('fs-extra');
var moment = require('moment');

module.exports = function (eleventyConfig) {
    // delete the old build directory
    fs.removeSync('./public');
    
    // copy the entire /static to /public (at build time)
    eleventyConfig.addPassthroughCopy("static");
    // copy the entire /source/admin to /public/admin (at build time)
    eleventyConfig.addPassthroughCopy({"source/admin": "admin"});
    // copy the file _redirects file at build time (it's for netlify)
    eleventyConfig.addPassthroughCopy({"source/_redirects": "_redirects"});
    //ISO format date {{ page.date | dateISO }}
    eleventyConfig.addFilter('dateISO', (date) => moment(date).toISOString() )
    //human readable date {{ page.date | dateReadable }}
    //TODO: language based dates
    eleventyConfig.addFilter('dateReadable', (date) => moment(date).locale('it').format('LL') )
    
    eleventyConfig.addPlugin(i18n, {
        translations,
        fallbackLocales: {
          '*': 'it'
        }
      });

    return {
        dir: {
            input: "source",
            output: "public",
            layouts: '_includes/layouts'
        }
    };
};