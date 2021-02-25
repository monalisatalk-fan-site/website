const bundleAnalyzer = require('@next/bundle-analyzer');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  ALGOLIA_APPLICATION_ID,
  ALGOLIA_SEARCH_ONLY_API_KEY,
  ANALYZE = 'false',
} = process.env;

const withBundleAnalyzer = bundleAnalyzer({ enabled: ANALYZE === 'true' });

module.exports = withBundleAnalyzer({
  env: {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
    ALGOLIA_APPLICATION_ID,
    ALGOLIA_SEARCH_ONLY_API_KEY,
  },
  trailingSlash: true,
});
