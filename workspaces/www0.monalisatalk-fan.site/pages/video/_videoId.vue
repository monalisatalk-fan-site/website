<template>
  <div>
    <div class="my app">
      <n-link to="/">TOP</n-link>
      <h1 v-if="video">{{video.title}}</h1>
      <VideoThumbnailImage :id="video.id" width="320" />
      <pre v-if="video">{{video.description}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, watch } from '@nuxtjs/composition-api';
import { useVideos } from '@/composables/useVideos';

export default defineComponent({
  name: 'VideoPage',
  components: {
    VideoThumbnailImage: () => import('@/components/VideoThumbnailImage.vue'),
  },
  setup() {
    const { route, error } = useContext();
    const videoId = computed(() => route.value.params.videoId);
    const [videos, isLoading] = useVideos();
    const video = computed(() => videos.value.find(({ id }) => id === videoId.value));

    watch(isLoading, () => {
      if (!isLoading.value && !video.value) {
        error({ statusCode: 404 });
      }
    }, { immediate: true });

    return {
      video,
    };
  },
});
</script>

<style lang="postcss" scoped>

</style>
