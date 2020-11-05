<template lang="pug">
  nuxt
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DefaultLayout',
  setup() {},
  head: {
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
</style>
