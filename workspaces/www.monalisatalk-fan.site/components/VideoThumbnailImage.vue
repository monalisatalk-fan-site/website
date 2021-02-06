<template>
  <img :src="`https://img.youtube.com/vi/${id}/maxresdefault.jpg`" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'VideoThumbnailImage',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>
