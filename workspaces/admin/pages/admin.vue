<template>
  <div class="main-wrapper">
    <MainNavbar />
    <MainSidebar />
    <div class="main-content">
      <section class="section">
        <nuxt-child />
      </section>
    </div>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    MainNavbar: () => import('@/components/MainNavbar.vue'),
    MainSidebar: () => import('@/components/MainSidebar.vue'),
    MainFooter: () => import('@/components/MainFooter.vue'),
  },
  setup() {},
});
</script>
