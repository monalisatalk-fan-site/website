import path from 'path';
import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
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
  render: {
    ssrLog: 'collapsed',
  },
  generate: {
    interval: 2000,
  },
};

export default config;
