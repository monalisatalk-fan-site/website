
import { NuxtConfig } from '@nuxt/types';
import path from 'path';
import mkdirp from 'mkdirp';

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

import { getGenerateRoutes } from './scripts/getGenerateRoutes';

const {
  FIREBASE_API_KEY = '',
  FIREBASE_AUTH_DOMAIN = '',
  FIREBASE_DATABASE_URL = '',
  FIREBASE_PROJECT_ID = '',
  FIREBASE_STORAGE_BUCKET = '',
  FIREBASE_MESSAGING_SENDER_ID = '',
  FIREBASE_APP_ID = '',
  FIREBASE_MEASUREMENT_ID = '',
} = process.env;

const config: NuxtConfig = {
  target: 'static',
  server: {
    port: 4000,
  },
  build: {
    cache: true,
    parallel: true,
    postcss: {
      preset: {
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
      },
    },
  },
  css: ['reset-css', '@/assets/styles/global.pcss'],
  vue: {
    // @ts-expect-error
    config: {
      productionTip: false,
      ignoredElements: ['ion-icon'],
    }
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api'],
  modules: [
    '@nuxtjs/firebase',
  ],
  firebase: {
    config: {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
      measurementId: FIREBASE_MEASUREMENT_ID,
    },
    services: {
      auth: true,
      database: true,
    },
  },
  generate: {
    routes: getGenerateRoutes,
  },
  hooks: {
    build: {
      compile() {
        mkdirp(path.join(__dirname, '.nuxt/static-json'));
      },
    },
  },
};

export default config;
