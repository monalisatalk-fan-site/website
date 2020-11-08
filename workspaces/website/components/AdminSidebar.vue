<template lang="pug">
  .admin-sidebar
    img.logo(src="//placehold.jp/320x120.png?text=★")
    .nav
      p(v-for="n in 100") sidebar.
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'AdminSidebar',
  components: {
    FontAwesomeIcon,
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@import 'resources';

.admin-sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > .logo {
    flex-shrink: 0;
    width: 100%;
  }

  & > .nav {
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
