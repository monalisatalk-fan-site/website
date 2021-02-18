<template>
  <VueTagsInput
    v-model="currentTag"
    :tags="value"
    :autocomplete-items="autocompleteItems"
    :style="{ width: '100%' }"
    @tags-changed="onTagsChanged"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import { ulid } from 'ulid';

export type TagsInputTag = {
  id: number | string;
  label: string;
  color?: string;
};

export type TagsInputValue = {
  id: number | string;
  label?: string;
};

export type ComponentTag = {
  text: string;
  style?: string;
  classes?: string;
};

export default defineComponent({
  name: 'AppTagsInput',
  components: {
    // @ts-expect-error
    VueTagsInput: () => import('@johmun/vue-tags-input'),
  },
  props: {
    model: {
      type: Array as PropType<TagsInputValue[]>,
      required: true,
    },
    tags: {
      type: Array as PropType<TagsInputTag[]>,
      required: true,
    },
  },
  model: {
    prop: 'model',
    event: 'input',
  },
  emits: {
    input: (value: TagsInputValue[]) => Array.isArray(value),
  },
  setup(props, { emit }) {
    const currentTag = ref('');
    const value = computed((): ComponentTag[] =>
      props.model.map(({ id, label = '' }) => {
        const tag = props.tags.find((tag) => tag.id === id);

        if (tag) {
          const { label, color } = tag;

          return {
            text: label,
            style: color ? `background-color: ${color};` : undefined,
          }
        }

        return {
          id: ulid(),
          text: label,
        };
      })
    );

    const autocompleteItems = computed((): ComponentTag[] => props.tags.map(({ label, color }) => ({
      text: label,
      style: color ? `background-image: ${color};` : undefined,
    })));

    const onTagsChanged = (value: ComponentTag[]) => {
      const model: TagsInputValue[] = value.map(({ text }) => {
        const tag = props.tags.find(({ label }) => label === text);

        if (tag) {
          const { id } = tag;

          return {
            id
          };
        }

        return {
          label: text,
          id: ulid(),
        }
      });

      emit('input', model);
    };

    return {
      currentTag,
      value,
      autocompleteItems,
      onTagsChanged,
    };
  },
});
</script>
