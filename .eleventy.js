require('dotenv').config();
const i18n = require('eleventy-plugin-i18n');
const translations = require('./source/_data/translations.js');
const fs = require('fs-extra');
const hljs = require('highlight.js');
var moment = require('moment');

const renderCode = function({ language, file, code}){
    let first_line = `<div class="code-first-line"><span>`;
    first_line = file ? first_line.concat(file, " ") : first_line;
    first_line = language ? first_line.concat("[" + language + "]", "</span><span class=\"code-buttons-copy\"></span></div>") : first_line.concat("<span class=\"code-buttons-copy\"></span></div>");
    let formatted_code = '';
    try {
        formatted_code = fields.hljslanguage ? hljs.highlight(language, code, true).value : hljs.highlightAuto(code).value;
    }
    catch (err){
        formatted_code = hljs.highlightAuto(code).value;
    }
    return `<section><pre>${first_line}<code class="hljs">${formatted_code}</code></pre></section>`;
            
}

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
    // capitalize first letter
    eleventyConfig.addFilter('upfirst', function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    });
    eleventyConfig.addFilter('renderCode', function(data) {
        return renderCode(data);
    });
    // to og image (adds crop query at the end of image url)
    eleventyConfig.addFilter('to-og-image', function(url) {
        return url+"?fit=crop&w=1200&h=630";
    });
    eleventyConfig.setBrowserSyncConfig({
        startPath: "/it/"
    });
    eleventyConfig.addPlugin(i18n, {
        translations,
        fallbackLocales: {
            '*': 'it'
        }
    });
    let markdownIt = require("markdown-it");
    let markdownItOptions = {
      html: true,
      breaks: true,
    };
    let mila = require("markdown-it-link-attributes");
    let milaOptions = {
        pattern: /^(?!(https:\/\/policumbent\.netlify\.app|#)).*$/gm,
        attrs: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
    };
    let markdownLib = markdownIt(markdownItOptions).use(mila, milaOptions);
    eleventyConfig.setLibrary("md", markdownLib);

    // render value as markdown filter use as: {{ md_data | markdown }}
    eleventyConfig.addFilter('markdown', function(value) {
        return markdownLib.render(value);
    });

    return {
        dir: {
            input: "source",
            output: "public",
            layouts: '_includes/layouts'
        }
    };
};