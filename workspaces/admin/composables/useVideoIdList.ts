import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api';

export const useVideoIdList = () => {
  const { app } = useContext();
  const isLoading = ref(true);
  const videoIdList = ref<any[]>([]);

  onMounted(async () => {
    const snapshot = await app.$fire.firestore.collection('videos').orderBy('publishedAt', 'desc').get();

    isLoading.value = false;

    videoIdList.value = snapshot.docs.map((doc) => ({ id: doc.id, publishedAt: doc.data().publishedAt }));
  });

  return [videoIdList, isLoading] as const;
};
