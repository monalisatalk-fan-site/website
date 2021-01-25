import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api';
import { useDatabase } from './useDatabase';

export const useVideoIdList = () => {
  const database = useDatabase();
  const isLoading = ref(true);
  const videoIdList = ref<any[]>([]);

  onMounted(async () => {
    const snapshot = await database.ref('videos').child('basic').once('value');

    isLoading.value = false;

    videoIdList.value = Object.entries(snapshot.val()).map(([key, body]) => ({
      key,
      ...body
    }));
  });

  return [videoIdList, isLoading] as const;
};
