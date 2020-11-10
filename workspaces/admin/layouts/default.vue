<template lang="pug">
  v-app
    template(v-if="isInitialized")
      AdminAppBar
      AdminDrawer(v-if="isSignedIn")
      v-main
        nuxt
    template(v-else)
      transition(name="fade")
        .progress-circular
          v-progress-circular(indeterminate)
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api';
import AdminDrawer from '@/components/AdminDrawer.vue';
import AdminAppBar from '@/components/AdminAppBar.vue';
import { useTypedStore } from '@/helpers';
import { url } from '@/utils';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    AdminDrawer,
    AdminAppBar,
  },
  setup() {
    const { app, route, redirect } = useContext();
    const store = useTypedStore();
    const isInitialized = computed(() => store.state.auth.isInitialized);
    const isSignedIn = computed(() => store.getters['auth/isSignedIn']);

    watch(
      [isInitialized, isSignedIn, route],
      async () => {
        if (route.value.path === url('SIGN_IN').path) {
          return;
        }

        if (isInitialized.value && !isSignedIn.value) {
          redirect(
            url('SIGN_IN', { query: { from: route.value.fullPath } }).toString()
          );
        }

        if (isSignedIn.value && !store.state.video.updatedAt) {
          await store.dispatch('video/fetchVideoResources');
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      app.$fire.auth.onAuthStateChanged((user) => {
        // @ts-expect-error
        store.commit('auth/setUser', user && user.toJSON());
      });
    });

    return {
      isInitialized,
      isSignedIn,
    };
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
          '//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto:wght@400;700&display=swap',
      },
    ],
    titleTemplate: (chunk) =>
      `${chunk ? `${chunk} - ` : ''}モナ・リザの戯言 ファンサイト Admin`,
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  background: #fff;
  transform: translate(-50%, -50%);
}
</style>
