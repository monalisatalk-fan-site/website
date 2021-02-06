import { watch } from '@nuxtjs/composition-api';

export const listener = (fn: () => (() => any) | void): void => {
  watch([], async (_value, _oldValue, onInvalidate) => {
    if (!process.client) {
      return;
    }

    const invalidator = await Promise.resolve(fn());

    if (!invalidator) {
      return;
    }

    onInvalidate(invalidator);
  }, { immediate: true });
};
