<template>
  <tr>
    <td>
      <n-link :to="`/authorized/videos/${id}`" class="btn">{{id}}</n-link>
    </td>
    <td>
      <img :key="id" :src="`//i.ytimg.com/vi/${id}/mqdefault.jpg`" loading="lazy" alt="" width="160" height="90">
    </td>
    <td>
      <template v-if="isLoading">Loading...</template>
      <template v-else>{{displayedTitle}}</template>
      <div class="table-links">
        <a :href="`//www.monalisatalk-fan.site/?id=${id}`" target="_blank" rel="noreferrer noopener">View on monalisatalk-fan.site</a>
        <div class="bullet"></div>
        <a :href="`//www.youtube.com/watch?v=${id}`" target="_blank" rel="noreferrer noopener">View on YouTube</a>
      </div>
    </td>
    <td>
      {{displayedDate}}
    </td>
  </tr>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api';
import { useDatabase } from '@/composables/useDatabase';

export type VideoTableRow = {
  id: string;
  title?: string;
  publishedAt: number;
};

export default defineComponent({
  name: 'VideoTableRow',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    publishedAt: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const database = useDatabase();
    const originalTitle = ref('');
    const isLoading = ref(true);
    const displayedTitle = computed(() => props.title || originalTitle.value);
    const displayedDate = computed(() => new Intl.DateTimeFormat('ja').format(new Date(props.publishedAt)));

    onMounted(async () => {
      const snapshot = await database.ref('videos').child('original').child(props.id).child('title').once('value');

      isLoading.value = false;
      originalTitle.value = snapshot.val() || '';
    });

    return {
      isLoading,
      displayedTitle,
      displayedDate,
    };
  },
});
</script>
