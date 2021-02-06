<template>
  <transition name="fade">
    <div v-show="loading" class="loading-screen">
      <div class="container">
        <img class="logo" src="@/assets/images/logo.svg" alt="">
        <img class="mt-5" src="@/assets/images/spinner-tail.svg" alt="">
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'LoadingScreen',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  place-items: center;
  background: #f4f6f9;
  z-index: 9999;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 320px;
}

.fade-leave-active {
  transition: opacity 0.2s 1s ease;
}

.fade-leave-to {
  opacity: 0;
  pointer-events: none;
}
</style>
