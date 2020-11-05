<template lang="pug">
  div
    MonaLisaNoSillyTalk
    div hello world.
    div(v-for="video in videos" :key="video.id") {{ video.id }}
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  computed,
  onMounted,
} from '@nuxtjs/composition-api';
import MonaLisaNoSillyTalk from '@/components/MonaLisaNoSillyTalk.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    MonaLisaNoSillyTalk,
  },
  setup() {
    const { store } = useContext();
    const videos = computed(() => store.state.video.videos);

    onMounted(async () => {
      await store.dispatch('video/fetchVideoResources');
    });

    return {
      videos,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'resources';
</style>
