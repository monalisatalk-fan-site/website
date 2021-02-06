module.exports = {
  plugins: [
    require('postcss-preset-env')({
      features: {
        'alpha-hex-colors': true,
        'custom-media-queries': true,
        'custom-properties': false,
        'gap-properties': true,
        'matches-pseudo-class': true,
        'media-query-ranges': true,
        'nesting-rules': true,
        'not-pseudo-class': true,
        'overflow-shorthand-property': true,
      },
    }),
  ],
};
