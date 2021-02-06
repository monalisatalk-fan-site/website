import { computed, onBeforeMount, ref, useContext, useStatic, watch } from '@nuxtjs/composition-api';
import { useDatabase } from '@/composables/useDatabase';
import { Video } from '@/types';

export const useVideos = () => {
  const { payload } = useContext();
  const database = useDatabase();
  const isLoading = ref(true);
  const videoList = useStatic(async (): Promise<Video[]> => {
    if (Array.isArray(payload)) {
      isLoading.value = false;
      
      return payload;
    }
    
    const snapshot = await database.ref('videos').once('value');
    const data = snapshot.val();

    isLoading.value = false;

    if (!data) {
      return [];
    }

    return Object.entries(data.basic)
      .map(([id, basic]) => {
        const { [id]: additional } = data.additional;
        const { [id]: voiceActors = [] } = data.voiceActors;
        const { [id]: statistics } = data.statistics;

        // 存在チェック
        if (!basic || !basic.title || !basic.publishedAt || !additional || !statistics) {
          return;
        }

        const { title, publishedAt } = basic;
        const { description } = additional;

        return {
          id,
          title,
          description,
          publishedAt,
          voiceActors: Object.keys(voiceActors),
          statistics,
        };
      })
      .filter(<T>(video: T): video is NonNullable<T> => video != null)
      .sort((a, b) => b.publishedAt - a.publishedAt);
  }, undefined, 'videos');
  const videos = computed(() => videoList.value || []);

  onBeforeMount(() => {
    if (videoList.value) {
      isLoading.value = false;
    }
  });
  
  return [
    videos,
    isLoading,
  ] as const;
};
