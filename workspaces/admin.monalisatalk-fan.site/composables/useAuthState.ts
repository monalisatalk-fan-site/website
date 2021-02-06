import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api';

export const useAuthState = () => {
  const { app } = useContext();
  const isLoading = ref(true);
  const user = ref<firebase.User | null>(null);
  const unsubscribe = ref<firebase.Unsubscribe>();

  onMounted(() => {
    isLoading.value = true;

    unsubscribe.value = app.$fire.auth.onAuthStateChanged((firebaseUser) => {
      isLoading.value = false;

      user.value = firebaseUser;
    });
  });

  onUnmounted(() => {
    if (unsubscribe.value) {
      unsubscribe.value();
    }
  });

  return {
    isLoading,
    user,
  }
};
