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
    //human readable date {% dateReadable date=page.date locale=locale %}
    eleventyConfig.addNunjucksShortcode('dateReadable', ({date, locale}) => moment(date).locale(locale).format('LL') )
    // render value as markdown
    eleventyConfig.addFilter('markdown', function(value) {
        let markdown = require('markdown-it')({
            html: true
        });
        return markdown.render(value);
    });
    // capitalize first letter
    eleventyConfig.addFilter('upfirst', function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    });
    // to og image (adds crop query at the end of image url)
    eleventyConfig.addFilter('to-og-image', function(url) {
        return url+"?fit=crop&w=1200&h=630";
    });
    
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