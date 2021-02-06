<template>
  <div>
    <VideoCalendar
      :year="year"
      :month="month"
      :videos="videos"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, watch } from '@nuxtjs/composition-api';
import { useVideos } from '@/composables/useVideos';

export default defineComponent({
  name: 'VideosCalendarPage',
  components: {
    VideoCalendar: () => import('@/components/VideoCalendar.vue'),
  },
  setup() {
    const { route, error } = useContext();
    const [videos] = useVideos();
    const year = computed(() => +route.value.params.year);
    const month = computed(() => +route.value.params.month);

    watch([], () => {
      const { params } = route.value;
      const d = new Date();
      
      if (
        // パラメータのフォーマットチェック
        !/^[0-9]{4}$/.test(params.year) ||
        !/^1?[0-9]$/.test(params.month) ||
        // year パラメータが 2019 〜 今年の範囲外なら 404
        year.value < 2019 || year.value > d.getFullYear() ||
        // month パラメータが 1 〜 12 の範囲外なら 404
        month.value < 1 || month.value > 12 ||
        // year が今年で、month が今月より未来の場合は 404
        (year.value === d.getFullYear() && month.value > d.getMonth() + 1)
      ) {
        error({ statusCode: 404 });
      }
    }, { immediate: true });

    return {
      year,
      month,
      videos,
    };
  },
});
</script>
