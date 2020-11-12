<template lang="pug">
  v-form(@submit.prevent="save")
    v-card
      v-card-title キャラクター追加
      v-card-text
        v-text-field(
          v-model="name"
          label="名前"
          hideDetails
        )
        .d-flex.align-center.mt-5
          .shrink
            v-chip(:color="mainColor" :textColor="textColor") {{ name || 'Unknown' }}
          .grow.ml-6
            ColorPickerField.ma-0.pa-0(
              v-model="mainColor"
              label="メインカラー"
            )
          .grow.ml-4
            ColorPickerField.ma-0.pa-0(
              v-model="textColor"
              label="テキストカラー"
            )
      v-card-actions
        v-spacer
        v-btn(
          color="grey"
          text
          @click="close"
        ) Cancel
        v-btn(
          type="submit"
          color="primary"
          text
        ) Save
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import ColorPickerField from '@/components/ColorPickerField.vue';
import { Character } from '@/types';

export default defineComponent({
  name: 'CharacterForm',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    defaultValue: {
      type: Object as PropType<Character>,
      default: null,
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  emits: {
    input: (value: boolean) => typeof value === 'boolean',
  },
  components: {
    ColorPickerField,
  },
  setup(props, { emit }) {
    const { app } = useContext();
    const name = ref('');
    const mainColor = ref('');
    const textColor = ref('');

    const reset = () => {
      name.value = '';
      mainColor.value = '';
      textColor.value = '';
    };

    const close = () => {
      emit('input', false);
    };

    const save = async (): Promise<void> => {
      const charactersRef = app.$fire.database.ref('characters');
      const data = {
        name: name.value,
        color: mainColor.value,
        textColor: textColor.value,
      };

      if (props.defaultValue) {
        await charactersRef.child(props.defaultValue.id).set(data);
      } else {
        await charactersRef.push(data);
      }

      close();
    };

    watch(
      () => props.value,
      (isOpen) => {
        if (!isOpen || !props.defaultValue) {
          reset();

          return;
        }

        name.value = props.defaultValue.name;
        mainColor.value = props.defaultValue.color;
        textColor.value = props.defaultValue.textColor;
      },
      {
        immediate: true,
      }
    );

    return {
      name,
      mainColor,
      textColor,
      close,
      save,
    };
  },
});
</script>
