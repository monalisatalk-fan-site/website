/** @type {import('snowpack').SnowpackUserConfig} */
module.exports = {
  mount: {
    src: '/dist',
    public: '/',
  },
  alias: {
    $components: './src/components',
    '@': './src',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-optimize',
  ],
  devOptions: {
    hostname: '0.0.0.0',
    port: 4000,
  open: 'none',
  },
};
