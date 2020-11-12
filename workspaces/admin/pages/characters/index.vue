<template lang="pug">
  v-container
    v-data-table(
      :headers="headers"
      :items="items"
      :loading="isLoading"
      disablePagination
      disableSort
    )
      template(v-slot:top)
        v-toolbar(flat)
          v-toolbar-title Characters
          v-spacer
          v-dialog(
            v-model="isEditorOpen"
            persistent
            maxWidth="600px"
          )
            template(v-slot:activator="{ on, attrs }")
              v-btn(text v-bind="attrs" v-on="on")
                v-icon.mr-2 mdi-account-plus-outline
                | ADD
            CharacterForm(
              v-model="isEditorOpen"
              :defaultValue="editingCharacter"
            )
      template(v-slot:item.name="{ item }")
        v-chip(
          :color="item.color"
          :textColor="item.textColor"
        ) {{ item.name }}
      template(v-slot:item.actions="{ item }")
        v-icon.mr-2(@click="edit(item)") mdi-pencil-outline
        v-icon(@click="isDeletingOpen = true") mdi-trash-can-outline
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  onMounted,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import CharacterForm from '@/components/CharacterForm.vue';
import { Character, DatabaseCharacter } from '@/types';

export default defineComponent({
  name: 'CharactersPage',
  components: {
    CharacterForm,
  },
  setup() {
    const { app } = useContext();
    const items = ref<Character[]>([]);
    const editingCharacter = ref<Character | null>(null);
    const isLoading = ref(true);
    const isEditorOpen = ref(false);
    const isDeletingOpen = ref(false);
    const headers = [
      { text: 'ID', value: 'id' },
      { text: '名前', value: 'name' },
      { text: 'Actions', value: 'actions' },
    ];
    const charactersRef = app.$fire.database.ref('characters');

    const getTransferCharacters = (id: string) =>
      items.value
        .filter((item) => item.id !== id)
        .map((item) => ({ value: item.id, text: item.name }));

    const edit = (character: Character) => {
      editingCharacter.value = character;
      isEditorOpen.value = true;
    };

    watch([isEditorOpen], () => {
      if (!isEditorOpen.value) {
        editingCharacter.value = null;
      }
    });

    onMounted(() => {
      charactersRef.on('value', (snapshot) => {
        isLoading.value = false;

        const value: Record<string, DatabaseCharacter> | null = snapshot.val();

        if (!value) {
          return;
        }

        items.value = Object.entries(value).map(([id, character]) => ({
          ...character,
          id,
        }));
      });
    });

    onBeforeUnmount(() => {
      charactersRef.off('value');
    });

    return {
      items,
      editingCharacter,
      isLoading,
      isEditorOpen,
      isDeletingOpen,
      headers,
      getTransferCharacters,
      edit,
    };
  },
});
</script>
