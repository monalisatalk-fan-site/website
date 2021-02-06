<template>
  <div>
    <GlobalHaeder />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DefaultLayout',
  head: {
    script: [
      { type: 'module', src: '//unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js' },
    ],
  },
  components: {
    GlobalHaeder: () => import('@/components/GlobalHaeder.vue'),
  },
  setup() {},
});
</script>
