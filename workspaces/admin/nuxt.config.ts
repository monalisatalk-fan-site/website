import { NuxtConfig } from '@nuxt/types';
import path from 'path';

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
  server: {
    port: 4001,
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api'],
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
          functions: true,
          database: true,
        },
      }
    ]
  ],
  css: ['@/assets/bootstrap/bootstrap.scss', '@/assets/stisla/style.scss', '@/assets/stisla/components.scss'],
  vue: {
    // @ts-expect-error
    config: {
      productionTip: false,
      ignoredElements: ['ion-icon'],
    }
  },
};

export default config;
