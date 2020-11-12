<template lang="pug">
  v-chip(
    v-if="character"
    v-bind="$attrs"
    :color="character.color"
    :textColor="character.textColor"
  ) {{ character.name }}
</template>

<script lang="ts">
import { useTypedStore } from '@/helpers';
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'CharacterChip',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useTypedStore();
    const character = computed(() =>
      store.state.character.characters.find(
        (character) => character.id === props.id
      )
    );

    return {
      character,
    };
  },
});
</script>
