import { onMount } from 'svelte';
import { readable } from 'svelte/store';

/** タッチデバイスか */
export const isTouchDevice = readable<boolean>(false, (set) => {
  onMount(() => {
    const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)');

    set(mediaQuery.matches);

    const handleMediaChanged = (event: MediaQueryListEvent) => {
      set(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChanged);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChanged);
    };
  });
});
