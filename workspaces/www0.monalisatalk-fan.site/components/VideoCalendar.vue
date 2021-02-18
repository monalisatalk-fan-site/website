<template>
  <div>
    <n-link to="/">TOP</n-link>
    <h1>{{year}}/{{month}}</h1>
    <div class="videoCalendar">
      <div v-for="i in offsetFirstWeek" :key="i" class="item"></div>
      <div v-for="(item, date) in calendar" :key="date" class="item">
        <p>{{date + 1}}</p>
        <img v-if="item[0]" :src="`http://img.youtube.com/vi/${item[0].id}/default.jpg`" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api';
import { Video } from '@/types';

/**
 * d1 と d2 が同じ日付かを判定
 */
const isSameDate = (d1: Date, d2: Date): boolean => {
  const d1Year = d1.getFullYear();
  const d1Month = d1.getMonth() + 1;
  const d1Date = d1.getDate();
  const d2Year = d2.getFullYear();
  const d2Month = d2.getMonth() + 1;
  const d2Date = d2.getDate();

  return d1Year === d2Year && d1Month === d2Month && d1Date === d2Date;
};

export default defineComponent({
  name: 'VideoCalendar',
  props: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    videos: {
      type: Array as PropType<Video[]>,
      required: true,
    },
  },
  setup(props) {
    const offsetFirstWeek = computed(() => new Date(props.year, props.month - 1, 1).getDay());
    const calendar = computed((): Video[][] => {
      const daysOfMonth = new Date(props.year, props.month, 0).getDate();

      return Array.from({ length: daysOfMonth })
        .fill(null)
        .map((_, date) => {
          const d = new Date(props.year, props.month - 1, date + 1);

          return props.videos.filter(({ publishedAt }) => isSameDate(d, new Date(publishedAt)));
        });
    });

    return {
      offsetFirstWeek,
      calendar,
    };
  },
});
</script>

<style lang="postcss" scoped>
.videoCalendar {
  display: flex;
  flex-wrap: wrap;

  & > .item {
    width: calc(100% / 7);
  }
}
</style>
