<template lang="pug">
  v-container
    v-alert(border="bottom" color="pink darken-1" dark) The dashboard is unavailable.
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DashboardPage',
  setup() {},
});
</script>
