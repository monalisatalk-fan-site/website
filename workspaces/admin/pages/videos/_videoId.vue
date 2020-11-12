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
          step="0.25"
          min="0.25"
          max="2"
          prependIcon="mdi-play-speed"
          thumb-label
          ticks
        )
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
              v-icon mdi-arrow-left
            v-list-item-content
              v-list-item-title 次のビデオ
              v-list-item-subtitle {{ nextVideo.title }}
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
              v-icon mdi-arrow-right
            v-list-item-content
              v-list-item-title 前のビデオ
              v-list-item-subtitle {{ previousVideo.title }}
      v-col(cols="8")
        template(v-if="video")
          .text-h5.mt-6 {{ video.title }}
          .text-body-2.text--secondary.mt-4 {{ formatDate(video.publishedAt) }}
          .text-h6.mt-6.mb-2 登場人物（メイン）
          .d-flex.flex-wrap
            v-checkbox.my-2.mx-3(
              v-for="character in characters"
              :key="character.id"
              v-model="mainCharacters"
              :value="character.id"
              hideDetails
            )
              template(#label)
                CharacterChip(:id="character.id" :small="true")
          .text-h6.mt-6.mb-2 登場人物（サブ）
          .d-flex.flex-wrap
            v-checkbox.my-2.mx-3(
              v-for="character in characters"
              :key="character.id"
              v-model="subCharacters"
              :value="character.id"
              hideDetails
            )
              template(#label)
                CharacterChip(:id="character.id" :small="true")
          .mt-6
            v-btn(
              color="primary"
              :loading="isSaving"
              @click="save"
            ) Save
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import CharacterChip from '@/components/CharacterChip.vue';
import { useTypedStore } from '@/helpers';
import { Video, DatabaseVideoContext } from '@/types';
import { url } from '@/utils';

export default defineComponent({
  name: 'VideoDetailPage',
  components: {
    CharacterChip,
  },
  setup() {
    const store = useTypedStore();
    const { app, route } = useContext();
    const playSpeed = ref(1);
    const mainCharacters = ref<string[]>([]);
    const subCharacters = ref<string[]>([]);
    const youtubeRef = ref<any | null>(null);
    const isSaving = ref(false);
    const videoId = computed(() => route.value.params.videoId);
    const video = computed((): Video | undefined =>
      store.state.video.videos.find((video) => video.id === videoId.value)
    );
    const characters = computed(() => store.state.character.characters);
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

    const onKeydown = async (e: KeyboardEvent) => {
      e.preventDefault();

      if (!youtubeRef.value) {
        return;
      }

      const player = youtubeRef.value.player;

      if (e.code === 'Space') {
        const playerState = await player.getPlayerState();

        if (playerState === 1 || playerState === 3) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }

        return;
      }

      const currentTime = await player.getCurrentTime();

      if (e.code === 'ArrowRight') {
        player.seekTo(currentTime + 5);

        return;
      }

      if (e.code === 'ArrowLeft') {
        player.seekTo(currentTime - 5);
      }
    };

    const save = async () => {
      try {
        isSaving.value = true;

        const data: DatabaseVideoContext = {
          mainCharacters: mainCharacters.value,
          subCharacters: subCharacters.value,
        };

        await app.$fire.database
          .ref('videoContext')
          .child(videoId.value)
          .set(data);
      } finally {
        isSaving.value = false;
      }
    };

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

    onMounted(async () => {
      await store.dispatch('character/fetchCharacters');
    });

    onMounted(async () => {
      const snapshot = await app.$fire.database
        .ref('videoContext')
        .child(videoId.value)
        .once('value');
      const value: DatabaseVideoContext | null = snapshot.val();

      if (!value) {
        return;
      }

      mainCharacters.value = value.mainCharacters || [];
      subCharacters.value = value.subCharacters || [];
    });

    onMounted(() => {
      window.addEventListener('keydown', onKeydown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', onKeydown);
    });

    return {
      playSpeed,
      youtubeRef,
      isSaving,
      videoId,
      video,
      mainCharacters,
      subCharacters,
      characters,
      breadcrumbItems,
      previousVideo,
      nextVideo,
      playerVars,
      getVideoUrl,
      formatDate,
      save,
    };
  },
});
</script>
