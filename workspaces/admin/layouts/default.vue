<template>
  <div id="app">
    <div class="main-wrapper">
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
    link: [
      { rel: 'stylesheet', href: '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
    ],
  },
  components: {
    MainSidebar: () => import('@/components/MainSidebar.vue'),
    MainFooter: () => import('@/components/MainFooter.vue'),
  },
  setup() {},
});
</script>
