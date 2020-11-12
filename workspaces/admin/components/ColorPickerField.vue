<template lang="pug">
  v-text-field(
    v-model="colorCode"
    readonly
    hideDetails
  )
    template(v-slot:append)
      v-menu(
        v-model="menu"
        :closeOnContentClick="false"
      )
        template(v-slot:activator="{ on, attrs }")
          v-btn.mb-2(
            v-on="on"
            v-bind="attrs"
            elevation="0"
            :color="colorCode"
            small
          )
        v-card
          v-card-text.pa-0
            v-color-picker(
              v-model="colorCode"
              mode="hexa"
              flat
            )
</template>

<script lang="ts">
import { computed, ref, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ColorPickerField',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  emits: {
    input: (data: string) => typeof data === 'string',
  },
  setup(props, { emit }) {
    const menu = ref(false);
    const colorCode = computed({
      get() {
        return props.value || '#000000FF';
      },
      set(data: string) {
        emit('input', data);
      },
    });
    const swatchStyle = computed(() => ({
      color: props.value,
      borderRadius: menu.value ? '50%' : '4px',
    }));

    return {
      menu,
      colorCode,
      swatchStyle,
    };
  },
});
</script>

<style scoped>
.swatch-button {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: border-radius 0.2s ease-in-out;
}
</style>
