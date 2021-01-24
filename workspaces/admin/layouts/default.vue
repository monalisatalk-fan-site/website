<template>
  <div id="app">
    <div class="spinner-border text-primary" role="status"></div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DefaultLayout',
  head: {
    titleTemplate: (chunk) => {
      const siteName = 'lollipop.onl admin';

      if (chunk) {
        return `${chunk} - ${siteName}`;
      }

      return siteName;
    },
    script: [
      { type: 'module', src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js' },
    ],
  },
  setup() {},
});
</script>
