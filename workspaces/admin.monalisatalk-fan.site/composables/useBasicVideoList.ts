import { computed } from "@nuxtjs/composition-api";
import { BasicVideo } from '@/types';
import { useStore } from "@/composables/useStore";

export const useBasicVideoList = () => {
  const store = useStore();
  const basicVideoList = computed((): BasicVideo[] => store.state.video.basicVideoList);

  return [
    basicVideoList,
    false,
  ] as const;
};
