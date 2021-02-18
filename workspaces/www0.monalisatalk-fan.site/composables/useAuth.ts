import {} from '@nuxt/types';
import type firebase from 'firebase/app';
import { ref, useContext } from '@nuxtjs/composition-api';
import { listener } from '@/composables/listener';

export const useAuth = () => {
  const { app } = useContext();
  const isLoading = ref(true);
  const user = ref<firebase.User | null>(null);

  listener(() => {
    const unsubscribe = app.$fire.auth.onAuthStateChanged((nextUser) => {
      isLoading.value = false;

      user.value = nextUser;
    });

    return () => {
      unsubscribe();
    };
  });

  return [user, isLoading] as const;
};
