<template lang="pug">
  .admin-layout-container
    template(v-if="isInitialized && isSignedIn")
      .sidebar
        AdminSidebar
      .main
        p(v-for="n in 200") main
        nuxt-child
    template(v-else)
      p logging in...
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  useContext,
} from '@nuxtjs/composition-api';
import AdminSidebar from '@/components/AdminSidebar.vue';
import { useTypedStore } from '@/helpers';
import { url } from '@/utils';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    AdminSidebar,
  },
  setup() {
    const { redirect, route } = useContext();
    const store = useTypedStore();
    const isInitialized = computed(() => store.state.auth.isInitialized);
    const isSignedIn = computed(() => store.getters['auth/isSignedIn']);

    watch(
      [isInitialized, isSignedIn],
      () => {
        if (isInitialized.value && !isSignedIn.value) {
          redirect(
            url('SIGN_IN', { query: { from: route.value.fullPath } }).toString()
          );
        }
      },
      { immediate: true }
    );

    return {
      isInitialized,
      isSignedIn,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'resources';

.admin-layout-container {
  display: flex;
  min-height: calc(var(--vh, 1vh) * 100);

  & > .sidebar {
    position: sticky;
    top: 0;
    flex-shrink: 0;
    width: 280px;
    height: calc(var(--vh, 1vh) * 100);
  }

  & > .main {
    flex-grow: 1;
  }
}
</style>
