<template lang="pug">
  v-container
    v-alert(
      border="left"
      color="pink darken-1"
      icon="mdi-alert-decagram-outline"
      dark
    ) The dashboard is not available.
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DashboardPage',
  setup() {},
});
</script>
