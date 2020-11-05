<template lang="pug">
.layout-container
  .body
    nuxt
  .footer
    MonaLisaNoSillyTalk(secondary)
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
} from '@nuxtjs/composition-api';
import MonaLisaNoSillyTalk from '@/components/MonaLisaNoSillyTalk.vue';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    MonaLisaNoSillyTalk,
  },
  setup() {
    const setBaseVh = () => {
      const vh = window.innerHeight * 0.01;
      const { documentElement } = document;

      if (documentElement instanceof HTMLElement) {
        documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', setBaseVh);
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
    titleTemplate: (chunk) =>
      `${chunk ? `${chunk} - ` : ''}モナ・リザの戯言 ファンサイト [UNOFFICIAL]`,
  },
});
</script>

<style lang="scss" scoped>
@import 'resources';
</style>

<style lang="scss">
@import 'main';

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
