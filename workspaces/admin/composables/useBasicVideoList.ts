import { onMounted, ref, watch } from "@nuxtjs/composition-api";
import { useDatabase } from "@/composables/useDatabase";

export type BasicVideo = {
  id: string;
  title: string;
  publishedAt: number;
};

export const useBasicVideoList = () => {
  const database = useDatabase();
  const isLoading = ref(true);
  const basicVideoList = ref<BasicVideo[]>([]);

  const invalidate = async () => {
    const snapshot = await database.ref('videos').child('basic').once('value');
    const value = snapshot.val();

    if (!value) {
      return;
    }

    isLoading.value = false;

    basicVideoList.value = Object.entries(value)
      .map(([id, body]) => ({ id, ...body }))
      .sort((a, b) => b.publishedAt - a.publishedAt);
  };

  onMounted(async () => {
    await invalidate();
  });

  return [
    basicVideoList,
    isLoading,
    invalidate,
  ] as const;
};
