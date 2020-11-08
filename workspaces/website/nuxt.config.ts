import path from 'path';
import { NuxtConfig } from '@nuxt/types';

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

const config: NuxtConfig = {
  ssr: false,
  modern: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api'],
  build: {
    loaders: {
      scss: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'assets/styles')],
        },
      },
    },
  },
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
  ],
  plugins: ['@/plugins/libraries', '@/plugins/fontAwesome'],
  render: {
    ssrLog: 'collapsed',
  },
  generate: {
    interval: 2000,
  },
};

export default config;
