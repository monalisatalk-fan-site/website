<template lang="pug">
  div
    div header.
    nuxt-child
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'AdminLayout',
  setup() {},
});
</script>

<style lang="scss" scoped>
@import 'resources';
</style>
