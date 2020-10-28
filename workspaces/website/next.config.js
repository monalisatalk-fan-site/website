/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

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
} = process.env;

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  env: {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
  },
  exportTrailingSlash: true,
  exportPathMap: () => {
    return {
      '/404.html': { page: '/404' },
    };
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
