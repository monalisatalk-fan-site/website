<template lang="pug">
  v-container
    v-data-table(
      :headers="headers"
      :items="items"
      :itemsPerPage="25"
      :loading="isLoading"
      :search="keyword"
      :footerProps="footerProps"
      @click:row="onClickRow"
    )
      template(v-slot:top)
        v-toolbar(flat)
          v-toolbar-title Videos
          v-spacer
          v-btn.mr-2(
            text
            :loading="isModifying"
            @click="modifyVideos"
          )
            v-icon.mr-2 mdi-video-plus-outline
            | Modify
          p.text-right.body-2.text--secondary.ma-0
            | Last modified: {{ formatDate(updatedAt) }}
        .mx-4.my-2
          v-text-field(
            v-model="keyword"
            label="検索キーワード"
            hideDetails
            outlined
            clearable
          )
      template(v-slot:item.thumbnail="{ item }")
        .pa-2
          v-img(:src="item.thumbnail" width="96" height="72")
      template(v-slot:item.title="{ item }")
        VideoTableTitle(:id="item.id")
      template(v-slot:item.publishedAt="{ item }")
        | {{ formatDate(item.publishedAt) }}
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import VideoTableTitle from '@/components/VideoTableTitle.vue';
import { useTypedStore } from '@/helpers';
import { url } from '@/utils';
import { Video } from '@/types';

export default defineComponent({
  name: 'VideosPage',
  components: {
    VideoTableTitle,
  },
  setup() {
    const { app, redirect } = useContext();
    const store = useTypedStore();
    const keyword = ref('');
    const isModifying = ref(false);
    const items = computed(() => store.state.video.videos);
    const isLoading = computed(
      () => !store.state.video.updatedAt && !store.state.video.error
    );
    const updatedAt = computed(() => store.state.video.updatedAt);
    const headers = [
      {
        text: 'サムネイル',
        value: 'thumbnail',
        sortable: false,
      },
      { text: 'タイトル', value: 'title' },
      { text: '公開日時', value: 'publishedAt' },
    ];
    const footerProps = {
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      itemsPerPageOptions: [10, 25, 50, 100, -1],
    };
    const onClickRow = (video: Video) => {
      redirect(url('VIDEOS_DETAIL', { params: { videoId: video.id } }));
    };
    const modifyVideos = async () => {
      if (!window.confirm('動画リストを最新にアップデートしますか？')) {
        return;
      }

      try {
        isModifying.value = true;

        const updateVideos = app.$fire.functions.httpsCallable('updateVideos');

        await updateVideos();

        await store.dispatch('video/fetchVideoResources');
      } finally {
        isModifying.value = false;
      }
    };
    const formatDate = (datetime: string) => {
      const d = app.$dayjs(datetime);

      if (app.$dayjs().diff(d, 'd') >= 25) {
        return d.format('YYYY/MM/DD');
      }

      // @ts-expect-error
      return d.fromNow();
    };

    onMounted(async () => {
      await Promise.all([
        store.dispatch('video/fetchVideoResources'),
        store.dispatch('character/fetchCharacters'),
      ]);
    });

    return {
      headers,
      items,
      keyword,
      isModifying,
      isLoading,
      updatedAt,
      footerProps,
      onClickRow,
      modifyVideos,
      formatDate,
    };
  },
});
</script>
