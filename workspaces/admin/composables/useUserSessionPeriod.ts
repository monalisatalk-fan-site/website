import { computed, ref, useContext, watch } from '@nuxtjs/composition-api';

export const useUserSessionPeriod = () => {
  const { app } = useContext();
  const sessionTimeSeconds = ref<number | null>(null);
  const isLoading = ref(true);
  const user = computed(() => app.$fire.auth.currentUser);

  watch(user, (user, _oldUser, onInvalidate) => {
    isLoading.value = true;

    if (!user) {
      sessionTimeSeconds.value = null;

      return;
    }

    let isInvalidated = false;
    const { lastSignInTime } = user.metadata;

    if (!lastSignInTime) {
      sessionTimeSeconds.value = null;

      return;
    }

    const frame = () => {
      if (isInvalidated) {
        return;
      }

      sessionTimeSeconds.value = (Date.now() - new Date(lastSignInTime).getTime()) / 1000;

      requestAnimationFrame(frame);
    };

    frame();

    onInvalidate(() => isInvalidated = true);
  }, { immediate: true });

  return [sessionTimeSeconds, isLoading] as const;
}
