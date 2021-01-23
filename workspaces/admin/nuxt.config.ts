import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  ssr: false,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api'],
  css: ['@/assets/bootstrap/bootstrap.scss', '@/assets/stisla/style.scss', '@/assets/stisla/components.scss'],
};

export default config;
