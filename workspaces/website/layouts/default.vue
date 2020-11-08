<template lang="pug">
.layout-container
  .body
    nuxt
  .footer
    GlobalFooter
    MonaLisaNoSillyTalk(secondary)
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  onMounted,
  onUnmounted,
} from '@nuxtjs/composition-api';
import firebase from 'firebase/app';
import GlobalFooter from '@/components/GlobalFooter.vue';
import MonaLisaNoSillyTalk from '@/components/MonaLisaNoSillyTalk.vue';
import { useTypedStore } from '@/helpers';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    GlobalFooter,
    MonaLisaNoSillyTalk,
  },
  setup() {
    const { app } = useContext();
    const store = useTypedStore();

    const setBaseVh = () => {
      const vh = window.innerHeight * 0.01;
      const { documentElement } = document;

      if (documentElement instanceof HTMLElement) {
        documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', setBaseVh);

      app.$fire.auth.onAuthStateChanged((user) => {
        // @ts-expect-error
        store.commit('auth/setUser', user && user.toJSON());
      });
    });

    onUnmounted(() => {
      window.removeEventListener('resize', setBaseVh);
    });
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          '//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
      },
    ],
    titleTemplate: (chunk) =>
      `${chunk ? `${chunk} - ` : ''}モナ・リザの戯言 ファンサイト [UNOFFICIAL]`,
  },
});
</script>

<style lang="scss" scoped>
@import 'resources';

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: calc(var(--vh, 1vh) * 100);

  & > .body {
    flex-grow: 1;
  }

  & > .footer {
    margin-top: auto;
  }
}
</style>

<style lang="scss">
@import 'main';
</style>
