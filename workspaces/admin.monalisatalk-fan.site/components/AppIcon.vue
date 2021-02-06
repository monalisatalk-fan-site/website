<template>
  <i class="app-icon ion" :class="className">
    <ion-icon :name="iconName"></ion-icon>
  </i>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'AppIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    sharp: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const iconName = computed(() => {
      if (props.name.startsWith('logo-')) {
        return props.name;
      }

      return props.filled ? props.name : props.sharp ? `${props.name}-sharp` : `${props.name}-outline`;
    });

    return {
      iconName,
    };
  },
});
</script>

<style scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
