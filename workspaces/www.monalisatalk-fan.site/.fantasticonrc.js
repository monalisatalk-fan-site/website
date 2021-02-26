module.exports = {
  fontTypes: ['ttf', 'woff', 'woff2'],
  assetTypes: ['ts', 'css'],
  formatOptions: {
    ts: {
      types: ['literalId'],
      singleQuotes: true,
    },
  },
  pathOptions: {
    ts: './types/iconfonts.d.ts',
  },
};
