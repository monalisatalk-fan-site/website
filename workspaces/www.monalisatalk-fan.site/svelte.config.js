const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    importer: [
      (url) => console.log(url) || url,
    ],
  }),
};
