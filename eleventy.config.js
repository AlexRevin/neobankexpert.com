const PostCSSPlugin = require("eleventy-plugin-postcss");
const { format } = require("date-fns");
// const { DateTime } = require("luxon");
// const markdownItAnchor = require("markdown-it-anchor");

const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(PostCSSPlugin);
  eleventyConfig.addPassthroughCopy({ "./src/assets/img": "/assets/img" });
  eleventyConfig.addWatchTarget("assets/**/*.{svg,webp,png,jpeg,css}");

  // App plugins
  // eleventyConfig.addPlugin(require("./eleventy.config.drafts.js"));
  // eleventyConfig.addPlugin(require("./eleventy.config.images.js"));

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginBundle);

  // Filters
  eleventyConfig.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", format(new Date(), "t"));
    return `${urlPart}?${params}`;
  });
  eleventyConfig.addFilter("noUnderscore", (text) => text.replace(/_/g, " "));

  let countries = [];
  eleventyConfig.addCollection("countryBanks", (collectionApi) => {
    const data = collectionApi.getAll()[1].data;
    return data.countries.map(({ attributes: { name, iso_code } }) => ({
      name,
      iso_code,
      banks: data.allBanks.filter((bank) =>
        bank.attributes.countries.data
          .map((bc) => bc.attributes.iso_code)
          .includes(iso_code)
      ),
    }));
  });
  eleventyConfig.addCollection("regionBanks", (collectionApi) => {
    const data = collectionApi.getAll()[1].data;
    return data.regions.map(({ name, id, countries } 
      ) => ({
      name,
      countries,
      banks: data.allBanks.filter((bank) =>
        bank.attributes.countries.data
          .reduce( (sum, n) => {return sum.concat(n.attributes.regions.data.map(r => r.id))}, [])
          .includes(id)
      ),
    }));
  });


  // eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
  // 	// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  // 	return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  // });

  // eleventyConfig.addFilter('htmlDateString', (dateObj) => {
  // 	// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  // 	return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  // });

  // // Get the first `n` elements of a collection.
  // eleventyConfig.addFilter("head", (array, n) => {
  // 	if(!Array.isArray(array) || array.length === 0) {
  // 		return [];
  // 	}
  // 	if( n < 0 ) {
  // 		return array.slice(n);
  // 	}

  // 	return array.slice(0, n);
  // });

  // Return the smallest number argument
  // eleventyConfig.addFilter("min", (...numbers) => {
  // 	return Math.min.apply(null, numbers);
  // });

  // // Return all the tags used in a collection
  // eleventyConfig.addFilter("getAllTags", collection => {
  // 	let tagSet = new Set();
  // 	for(let item of collection) {
  // 		(item.data.tags || []).forEach(tag => tagSet.add(tag));
  // 	}
  // 	return Array.from(tagSet);
  // });

  // eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
  // 	return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  // });

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "header-anchor",
        symbol: "#",
        ariaHidden: false,
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter("slugify"),
    });
  });

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      // "liquid"
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // These are all optional:
    dir: {
      input: "src", // default: "."
      includes: "../_includes", // default: "_includes"
      data: "../_data/fetchers/datapoints", // default: "_data"
      output: "_site",
    },

    // -----------------------------------------------------------------
    // Optional items:
    // -----------------------------------------------------------------

    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

    // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
    // it will transform any absolute URLs in your HTML to include this
    // folder name and does **not** affect where things go in the output folder.
    pathPrefix: "/",
    passthroughFileCopy: true,
  };
};
