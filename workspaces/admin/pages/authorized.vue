<template>
  <div>
    <template v-if="isLoggedIn">
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
    <LoadingScreen :loading="!isLoggedIn" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, watch } from '@nuxtjs/composition-api';
import { useAuthState } from '@/composables';

export default defineComponent({
  name: 'AuthorizedLayout',
  components: {
    MainNavbar: () => import('@/components/MainNavbar.vue'),
    MainSidebar: () => import('@/components/MainSidebar.vue'),
    MainFooter: () => import('@/components/MainFooter.vue'),
    LoadingScreen: () => import('@/components/LoadingScreen.vue'),
  },
  setup() {
    const { redirect } = useContext();
    const { user, isLoading } = useAuthState();
    const isLoggedIn = computed(() => !!user.value && !isLoading.value);

    watch([user, isLoading], () => {
      if (!user.value && !isLoading.value) {
        redirect('/login');
      }
    });

    return {
      isLoggedIn,
    };
  },
});
</script>
