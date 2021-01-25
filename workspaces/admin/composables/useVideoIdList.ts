import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api';

export const useVideoIdList = () => {
  const { app } = useContext();
  const isLoading = ref(true);
  const videoIdList = ref<any[]>([]);

  onMounted(async () => {
    const snapshot = await app.$fire.firestore.collection('videos').orderBy('publishedAt', 'desc').get({ source: 'cache' });

    isLoading.value = false;

    videoIdList.value = snapshot.docs.map((doc) => doc.id);
  });

  return [videoIdList, isLoading] as const;
};
