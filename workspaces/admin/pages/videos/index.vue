<template lang="pug">
  v-container
    v-data-table(
      :headers="headers"
      :items="items"
      :items-per-page="25"
      :loading="isLoading"
      :search="keyword"
      :footerProps="footerProps"
      @click:row="onClickRow"
    )
      template(v-slot:top)
        .mx-4.mb-2
          p.text-right.body-2.text--secondary
            | Last modified: {{ formatDate(updatedAt) }}
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
import { useTypedStore } from '@/helpers';
import { url } from '@/utils';
import { Video } from '@/types';

export default defineComponent({
  name: 'VideosPage',
  setup() {
    const { app, redirect } = useContext();
    const store = useTypedStore();
    const keyword = ref('');
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
    const formatDate = (datetime: string) => {
      const d = app.$dayjs(datetime);

      if (app.$dayjs().diff(d, 'd') >= 25) {
        return d.format('YYYY/MM/DD');
      }

      // @ts-expect-error
      return d.fromNow();
    };

    onMounted(async () => {
      await store.dispatch('video/fetchVideoResources');
    });

    return {
      headers,
      items,
      keyword,
      isLoading,
      updatedAt,
      footerProps,
      onClickRow,
      formatDate,
    };
  },
});
</script>
