module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        features: {
          'alpha-hex-colors': true,
          'custom-properties': false,
          'custom-media-queries': {
            preserve: false,
            importFrom: {
              customMedia: {
                '--small-viewport': 'screen and (width < 640px)',
                '--medium-viewport': 'screen and (860px > width >= 640px)',
                '--large-viewport': 'screen and (width >= 860px)',
                '--header-small-viewport': 'screen and (width < 800px)',
              },
            },
          },
          'gap-properties': true,
          'matches-pseudo-class': true,
          'media-query-ranges': true,
          'nesting-rules': true,
          'not-pseudo-class': true,
          'overflow-shorthand-property': true,
        },
      }
    ],
    'postcss-easings',
  ],
};
