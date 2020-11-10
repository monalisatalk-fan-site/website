import path from 'path';
import { NuxtConfig } from '@nuxt/types';

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

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

const config: NuxtConfig = {
  ssr: false,
  modern: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/vuetify',
  ],
  build: {},
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  loading: false,
  modules: [
    [
      '@nuxtjs/firebase',
      {
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
          firestore: true,
          functions: true,
          storage: true,
          analytics: true,
        },
      },
    ],
    [
      '@nuxtjs/dayjs',
      {
        locales: ['en'],
        defaultLocale: 'en',
        plugins: ['relativeTime'],
      },
    ],
  ],
  plugins: ['@/plugins/libraries'],
  render: {
    ssrLog: 'collapsed',
  },
  generate: {
    interval: 2000,
  },
  vuetify: {
    defaultAssets: {
      font: {
        family: 'Noto Sans JP',
      },
    },
  },
};

export default config;
