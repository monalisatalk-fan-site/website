<template lang="pug">
  div
    template(v-if="isNotFound")
      .d-flex.flex-column.align-center
        img.mt-16(src="@/assets/images/page-not-found.svg" width="320" height="320")
        v-btn.mt-16(
          x-large
          outlined
          color="primary"
          :to="dashboardUrl"
        )
          v-icon.mr-3 mdi-view-dashboard-outline
          | ダッシュボード
</template>

<script lang="ts">
import { url } from '@/utils';
import { defineComponent, computed } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object as any,
      required: true,
    },
  },
  setup(props) {
    const isNotFound = computed(() => props.error?.statusCode === 404);
    const dashboardUrl = url('DASHBOARD');

    return {
      isNotFound,
      dashboardUrl,
    };
  },
});
</script>
