<template>
  <div>
    <h1>Index page.</h1>
    <ul>
      <li v-for="video in filteredVideos" :key="video.id">
        <VideoCard :video="video" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useVideos } from '@/composables/useVideos';
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'IndexPage',
  components: {
    VideoCard: () => import('@/components/VideoCard.vue'),
  },
  setup() {
    const [videos] = useVideos();
    const filteredVideos = computed(() => videos.value.slice().splice(0, 10));

    return {
      filteredVideos,
    };
  },
});
</script>

<style lang="postcss" scoped>
@import '@/assets/styles/resources.pcss';

h1 {
  color: var(--color);
}
</style>