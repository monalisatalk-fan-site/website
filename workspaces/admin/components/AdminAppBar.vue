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
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { useTypedStore } from '@/helpers';

export default defineComponent({
  name: 'AdminAppBar',
  setup() {
    const store = useTypedStore();
    const drawer = computed(() => store.state.ui.drawer);
    const isSignedIn = computed(() => store.getters['auth/isSignedIn']);
    const toggleDrawer = () => store.commit('ui/setDrawer', !drawer.value);

    return {
      isSignedIn,
      toggleDrawer,
    };
  },
});
</script>
