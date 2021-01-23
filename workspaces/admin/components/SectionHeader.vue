<template>
  <div class="section-header">
    <h1>{{title}}</h1>
    <slot name="buttons" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>
