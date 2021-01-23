<template>
  <div id="app">
    <div class="main-wrapper">
      <MainNavbar />
      <MainSidebar />
      <div class="main-content">
        <section class="section">
          <nuxt />
        </section>
      </div>
      <MainFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DefaultLayout',
  head: {
    script: [
      { type: 'module', src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js' },
    ],
  },
  components: {
    MainNavbar: () => import('@/components/MainNavbar.vue'),
    MainSidebar: () => import('@/components/MainSidebar.vue'),
    MainFooter: () => import('@/components/MainFooter.vue'),
  },
  setup() {},
});
</script>
