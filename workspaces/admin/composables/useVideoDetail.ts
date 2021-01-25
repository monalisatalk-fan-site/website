import type firebase from 'firebase/app';
import { onMounted, onUnmounted, ref, useContext } from "@nuxtjs/composition-api";
import { useDatabase } from './useDatabase';

export type VideoDetail = {
  id: string;
  title?: string;
  publishedAt: number;
  description?: string;
  original: {
    title: string;
    description: string;
  };
  actors: string[];
  tags: string[];
  voiceActors: string[];
};

export const useVideoDetail = (id: string) => {
  const database = useDatabase();
  const video = ref<VideoDetail>();
  const isLoading = ref(true);

  onMounted(async () => {
    const [
      basicSnapshot,
      additionalSnapshot,
      originalSnapshot,
      actorsSnapshot,
      tagsSnapshot,
      voiceActorsSnapshot,
    ] = await Promise.all([
      database.ref('videos').child('basic').child(id).once('value'),
      database.ref('videos').child('additional').child(id).once('value'),
      database.ref('videos').child('original').child(id).once('value'),
      database.ref('videos').child('actors').child(id).once('value'),
      database.ref('videos').child('tags').child(id).once('value'),
      database.ref('videos').child('voiceActors').child(id).once('value'),
    ]);

    const basic = basicSnapshot.val();
    const additional = additionalSnapshot.val();
    const original = originalSnapshot.val();
    const actors = actorsSnapshot.val();
    const tags = tagsSnapshot.val();
    const voiceActors = voiceActorsSnapshot.val();

    isLoading.value = false;

    if (!basic || !original) {
      video.value = undefined;

      return;
    }

    const { title, publishedAt } = basic;

    video.value = {
      id,
      title,
      description: additional?.description,
      publishedAt,
      original,
      actors: Object.keys(actors || {}),
      tags: Object.keys(tags || {}),
      voiceActors: Object.keys(voiceActors || {}),
    };
  });

  return [
    video,
    isLoading,
  ] as const;
};
