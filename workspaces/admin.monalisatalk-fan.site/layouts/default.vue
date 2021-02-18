<template>
  <div id="app">
    <div class="spinner-border text-primary" role="status"></div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api';
import { useDatabase, useStore } from '@/composables';
import type { DatabaseStructure } from '@shared/types/database';
import type { DefineTypedDataSnapshot } from '@shared/types/database-typekit';

export default defineComponent({
  name: 'DefaultLayout',
  head: {
    titleTemplate: (chunk) => {
      const siteName = 'lollipop.onl admin';

      if (chunk) {
        return `${chunk} - ${siteName}`;
      }

      return siteName;
    },
    script: [
      { type: 'module', src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js' },
    ],
  },
  setup() {
    const database = useDatabase();
    const store = useStore();

    watch([], (_value, _oldValue, onInvalidate) => {
      const receiveBasicVideoValue = (snapshot: DefineTypedDataSnapshot<DatabaseStructure['videos']['basic']>) => {
        const value = snapshot.val();

        if (!value) {
          return;
        }

        store.commit('video/setBasicVideoList', value);
      };

      const receiveVoiceActorValue = (snapshot: DefineTypedDataSnapshot<DatabaseStructure['voiceActors']>) => {
        const value = snapshot.val();

        if (!value) {
          return;
        }

        store.commit('video/setVoiceActorList', value);
      };

      database.ref('videos').child('basic').on('value', receiveBasicVideoValue);
      database.ref('voiceActors').on('value', receiveVoiceActorValue);

      onInvalidate(() => {
        database.ref('videos').child('basic').off('value', receiveBasicVideoValue);
        database.ref('voiceActors').off('value', receiveVoiceActorValue);
      });
    }, { immediate: true });
  },
});
</script>

<style>
body {
  overflow-y: scroll;
}
</style>
