import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api';

export const useVideoIdList = () => {
  const { app } = useContext();
  const videoIdList = ref<any[]>([]);
  const unsubscribe = ref<firebase.Unsubscribe>();

  onMounted(() => {
    unsubscribe.value = app.$fire.firestore.collection('videos').onSnapshot((snapshot) => {
      videoIdList.value = snapshot.docs.map((doc) => doc.id);
    });
  });

  onUnmounted(() => {
    if (unsubscribe.value) {
      unsubscribe.value();
    }
  });

  return videoIdList;
};
