/** @type {import('snowpack').SnowpackUserConfig} */
module.exports = {
  mount: {
    src: '/dist',
    public: '/',
  },
  alias: {
    '~': './src',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-optimize',
    [
      '@snowpack/plugin-run-script',
      { cmd: 'svelte-check --output human', watch: '$1 --watch', output: 'stream' },
    ],
  ],
  devOptions: {
    hostname: '0.0.0.0',
    port: 4000,
    open: 'none',
  },
};
