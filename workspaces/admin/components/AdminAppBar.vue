<template lang="pug">
  v-app-bar(
    app
    absolute
    color="transparent"
    flat
  )
    v-btn.mr-3(
      v-if="isSignedIn"
      elevation="0"
      fab
      small
      @click="toggleDrawer"
    )
      v-icon mdi-menu
    v-toolbar-title(v-text="'モナ・リザの戯言 ファンサイト'")
    v-spacer
    v-btn(
      v-if="isSignedIn"
      min-width="0"
      text
      @click="updateVideos"
      :loading="isUpdating"
    )
      v-icon mdi-video-plus-outline
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import { useTypedStore } from '@/helpers';

export default defineComponent({
  name: 'AdminAppBar',
  setup() {
    const { app } = useContext();
    const store = useTypedStore();
    const isUpdating = ref(false);
    const drawer = computed(() => store.state.ui.drawer);
    const isSignedIn = computed(() => store.getters['auth/isSignedIn']);
    const toggleDrawer = () => store.commit('ui/setDrawer', !drawer.value);
    const updateVideos = async () => {
      if (!window.confirm('動画リストを最新にアップデートしますか？')) {
        return;
      }

      try {
        isUpdating.value = true;

        const updateVideos = app.$fire.functions.httpsCallable('updateVideos');

        await updateVideos();

        await store.dispatch('video/fetchVideoResources');
      } finally {
        isUpdating.value = false;
      }
    };

    return {
      isUpdating,
      isSignedIn,
      toggleDrawer,
      updateVideos,
    };
  },
});
</script>
