import { computed, onBeforeMount, ref, useContext, useStatic } from '@nuxtjs/composition-api';
import { useDatabase } from '@/composables/useDatabase';
import { VoiceActor } from '@/types';

export const useVideos = () => {
  const { payload } = useContext();
  const database = useDatabase();
  const isLoading = ref(true);
  const voiceActorList = useStatic(async (): Promise<VoiceActor[]> => {
    const snapshot = await database.ref('voiceActors').once('value');
    const data = snapshot.val();

    if (!data) {
      return [];
    }

    return Object.entries(data)
      .map(([id, body]) => {
        // 存在チェック
        if (!body) {
          return;
        }

        const { name } = body;

        return {
          id,
          name,
        };
      })
      .filter(<T>(video: T): video is NonNullable<T> => video != null);
  }, undefined, 'voice-actors');
  const voiceActors = computed(() => voiceActorList.value || []);

  onBeforeMount(() => {
    if (voiceActorList.value) {
      isLoading.value = false;
    }
  });
  
  return [
    voiceActors,
    isLoading,
  ] as const;
};
