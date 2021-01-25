<template>
  <tr>
    <td>
      <n-link :to="`/authorized/videos/${id}`" class="btn">{{id}}</n-link>
    </td>
    <td>
      <img :key="id" :src="`//i.ytimg.com/vi/${id}/mqdefault.jpg`" alt="" width="160" height="90">
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
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { useVideoDetail } from '@/composables';

export default defineComponent({
  name: 'VideoTableRow',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const [video, isLoading] = useVideoDetail(props.id);
    const title = computed(() => video.value?.details?.title || video.value?.original.title);
    const publishedAt = computed(() => {
      if (!video.value?.publishedAt) {
        return;
      }

      return new Intl.DateTimeFormat('ja').format(new Date(video.value.publishedAt));
    });

    return {
      isLoading,
      title,
      publishedAt,
    };
  },
});
</script>
