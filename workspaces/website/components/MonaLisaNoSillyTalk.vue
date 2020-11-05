<template lang="pug">
.mona-lisa-no-silly-talk(:class="{ '-secondary': secondary }")
  .text
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'MonaLisaNoSillyTalk',
  props: {
    secondary: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@import 'resources';

@keyframes move-right {
  0% {
    background-position: 0 center;
  }

  100% {
    background-position: 563.12195122px center;
  }
}

@keyframes move-left {
  0% {
    background-position: 0 center;
  }

  100% {
    background-position: -563px center;
  }
}

.mona-lisa-no-silly-talk {
  width: 100%;
  height: 48px;
  background-color: #000;

  & > .text {
    width: 100%;
    height: 100%;
    background-image: url(~assets/images/monalisanosillytalk.png);
    filter: invert(67%) sepia(87%) saturate(219%) hue-rotate(149deg) brightness(87%) contrast(93%);
    background-repeat: repeat-x;
    background-size: auto 24px;
    animation: move-left 12s linear infinite;
  }

  &.-secondary > .text {
    filter: invert(11%) sepia(85%) saturate(4131%) hue-rotate(343deg) brightness(112%) contrast(93%);
    animation: move-right 12s linear infinite;
  }
}
</style>
