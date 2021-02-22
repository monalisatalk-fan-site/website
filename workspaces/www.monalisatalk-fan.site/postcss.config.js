module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        features: {
          'alpha-hex-colors': true,
          'custom-properties': false,
          'custom-media-queries': true,
          'gap-properties': true,
          'matches-pseudo-class': true,
          'media-query-ranges': true,
          'nesting-rules': true,
          'not-pseudo-class': true,
          'overflow-shorthand-property': true,
        },
      }
    ],
  ],
};
