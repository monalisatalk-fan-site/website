import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from "@nuxtjs/composition-api";

export const useVideoDetail = (id: string, watch = false) => {
  const { app } = useContext();
  const video = ref<any>();
  const isLoading = ref(true);
  const unsubscribe = ref<firebase.Unsubscribe>();

  onMounted(async () => {
    if (watch) {
      return;
    }

    const snapshot = await app.$fire.firestore.collection('videos').doc(id).get({ source: 'cache' });
    const data = snapshot.data();

    video.value = data;
    isLoading.value = false;
  });

  onMounted(() => {
    if (!watch) {
      return;
    }

    unsubscribe.value = app.$fire.firestore.collection('videos').doc(id).onSnapshot((snapshot) => {
      const data = snapshot.data();

      video.value = data;
      isLoading.value = false;
    });
  });

  onUnmounted(() => {
    if (unsubscribe.value) {
      unsubscribe.value();
    }
  });

  return [
    video,
    isLoading,
  ] as const;
};
