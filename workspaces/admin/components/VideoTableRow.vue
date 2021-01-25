<template>
  <tr>
    <td>
      <n-link :to="`/authorized/videos/${id}`" class="btn">{{id}}</n-link>
    </td>
    <td>
      <img :key="id" :src="`//i.ytimg.com/vi/${id}/mqdefault.jpg`" loading="lazy" alt="" width="160" height="90">
    </td>
    <td>
      <template v-if="isLoading">
        Loading...
      </template>
      <template v-else>
        {{title}}
        <div class="table-links">
          <a :href="`//www.monalisatalk-fan.site/?id=${id}`" target="_blank" rel="noreferrer noopener">View on monalisatalk-fan.site</a>
          <div class="bullet"></div>
          <a :href="`//www.youtube.com/watch?v=${id}`" target="_blank" rel="noreferrer noopener">View on YouTube</a>
        </div>
      </template>
    </td>
    <td>
      <template v-show="!isLoading">
        {{publishedAt}}
      </template>
    </td>
  </tr>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'VideoTableRow',
  props: {
    id: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { app } = useContext();
    const isLoading = ref(true);
    const title = ref('');

    onMounted(async () => {
      try {
        const videoDetailSnapshot = await app.$fire.firestore.collection('videoDetails').doc(props.id).get();
        const videoDetail = videoDetailSnapshot.data();

        if (videoDetail && videoDetail.title) {
          title.value = videoDetail.title;

          return;
        }

        const originalVideoSnapshot = await app.$fire.firestore.collection('originalVideos').doc(props.id).get();
        const originalVideo = originalVideoSnapshot.data();

        if (!originalVideo) {
          return;
        }

        title.value = originalVideo.title;
      } finally {
        isLoading.value = false;
      }
    });

    return {
      isLoading,
      title,
    };
  },
});
</script>
