import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api';

export const useVideoIdList = () => {
  const { app } = useContext();
  const videoIdList = ref<any[]>([]);

  onMounted(async () => {
    const snapshot = await app.$fire.firestore.collection('videos').orderBy('publishedAt', 'desc').get({ source: 'cache' });

    videoIdList.value = snapshot.docs.map((doc) => doc.id);
  });

  return videoIdList;
};
