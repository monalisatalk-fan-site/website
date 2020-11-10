<template lang="pug">
  v-container
    v-breadcrumbs(:items="breadcrumbItems")
    v-row
      v-col(cols="4")
        youtube(
          ref="youtubeRef"
          :videoId="videoId"
          :playerVars="playerVars"
          style="width: 100%"
        )
        v-slider.mt-3(
          v-model="playSpeed"
          step="0.2"
          min="1"
          max="2"
          prependIcon="mdi-play-speed"
          thumb-label
          ticks
        )
        v-sheet.mt-6(
          v-if="previousVideo"
          light
          outlined
        )
          v-list-item(
            link
            exact
            :to="getVideoUrl(previousVideo)"
          )
            v-list-item-icon
              v-icon mdi-arrow-left
            v-list-item-content
              v-list-item-title 前のビデオ
              v-list-item-subtitle {{ previousVideo.title }}
        v-sheet.mt-4(
          v-if="nextVideo"
          light
          outlined
        )
          v-list-item(
            link
            exact
            :to="getVideoUrl(nextVideo)"
          )
            v-list-item-icon
              v-icon mdi-arrow-right
            v-list-item-content
              v-list-item-title 次のビデオ
              v-list-item-subtitle {{ nextVideo.title }}
      v-col(cols="8")
        template(v-if="video")
          .text-h5.mt-6 {{ video.title }}
          .text-body-2.text--secondary.mt-4 {{ formatDate(video.publishedAt) }}
</template>

<script lang="ts">
import { useTypedStore } from '@/helpers';
import { Video } from '@/types';
import { url } from '@/utils';
import {
  computed,
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'VideoDetailPage',
  setup() {
    const store = useTypedStore();
    const { app, route } = useContext();
    const playSpeed = ref(1);
    const youtubeRef = ref<any | null>(null);
    const videoId = computed(() => route.value.params.videoId);
    const video = computed((): Video | undefined =>
      store.state.video.videos.find((video) => video.id === videoId.value)
    );
    const breadcrumbItems = computed(() => [
      { text: 'Videos', exact: true, to: url('VIDEOS') },
      { text: 'here', disabled: true },
    ]);
    const currentVideoIndex = computed((): number =>
      store.state.video.videos.findIndex((video) => video.id === videoId.value)
    );
    const previousVideo = computed(
      (): Video | undefined =>
        store.state.video.videos[currentVideoIndex.value - 1]
    );
    const nextVideo = computed((): Video | undefined =>
      currentVideoIndex.value >= 0
        ? store.state.video.videos[currentVideoIndex.value + 1]
        : undefined
    );
    const playerVars = {
      enablejsapi: 1,
      iv_load_policy: 3,
      fs: 0,
    };

    const getVideoUrl = (video: Video) =>
      url('VIDEOS_DETAIL', { params: { videoId: video.id } });

    const formatDate = (datetime: string) =>
      app.$dayjs(datetime).format('YYYY/MM/DD HH:ss Z');

    watch(
      playSpeed,
      () => {
        if (!youtubeRef.value) {
          return;
        }

        youtubeRef.value.player.setPlaybackRate(playSpeed.value);
      },
      {
        immediate: true,
      }
    );

    return {
      playSpeed,
      youtubeRef,
      videoId,
      video,
      breadcrumbItems,
      previousVideo,
      nextVideo,
      playerVars,
      getVideoUrl,
      formatDate,
    };
  },
});
</script>
