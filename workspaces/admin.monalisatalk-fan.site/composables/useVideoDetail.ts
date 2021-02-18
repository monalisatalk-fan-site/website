import Vue from 'vue';
import { computed, Ref, ref, watch } from "@nuxtjs/composition-api";
import { useDatabase } from './useDatabase';

export type VideoDetail = {
  id: string;
  title: string;
  description?: string;
  publishedAt: number;
  original: {
    title: string;
    description: string;
  };
  actors: string[];
  tags: string[];
  voiceActors: string[];
};

export const isVideoDetail = <T extends Partial<VideoDetail>>(value: T): value is Required<T> => {
  return (
    value.id != null &&
    value.title != null &&
    value.publishedAt != null &&
    value.original != null &&
    value.actors != null &&
    value.tags != null &&
    value.voiceActors != null
  );
};

export const useVideoDetail = (id: Ref<string>) => {
  const database = useDatabase();
  const loadingStack = ref<boolean[]>([]);
  const videoCache = ref<Partial<VideoDetail>>({});
  const isLoading = computed(() => loadingStack.value.length < 6);
  const video = computed((): VideoDetail | undefined => {
    if (isVideoDetail(videoCache.value)) {
      return videoCache.value;
    }
  });

  watch(id, () => {
    Vue.typedSet(videoCache.value, 'id', id.value);
  }, { immediate: true });

  watch(id, async (_value, _oldValue, onInvalidate) => {
    const snapshot = await database.ref('videos').child('basic').child(id.value).once('value');
    const value = snapshot.val();

    loadingStack.value.push(true);

    if (value) {
      Vue.typedSet(videoCache.value, 'title', value.title);
      Vue.typedSet(videoCache.value, 'publishedAt', value.publishedAt);
    }

    onInvalidate(() => {
      loadingStack.value.pop();

      Vue.typedDelete(videoCache.value, 'title');
      Vue.typedDelete(videoCache.value, 'publishedAt');
    });
  }, { immediate: true });

  watch(id, async (_value, _oldValue, onInvalidate) => {
    const snapshot = await database.ref('videos').child('additional').child(id.value).once('value');
    const value = snapshot.val();

    loadingStack.value.push(true);

    if (value) {
      Vue.typedSet(videoCache.value, 'description', value.description);
    }

    onInvalidate(() => {
      loadingStack.value.pop();

      Vue.typedDelete(videoCache.value, 'description');
    });
  }, { immediate: true });

  watch(id, async (_value, _oldValue, onInvalidate) => {
    const snapshot = await database.ref('videos').child('original').child(id.value).once('value');
    const value = snapshot.val();

    loadingStack.value.push(true);

    if (value) {
      Vue.typedSet(videoCache.value, 'original', value);
    }

    onInvalidate(() => {
      loadingStack.value.pop();

      Vue.typedDelete(videoCache.value, 'original');
    });
  }, { immediate: true });

  watch(id, async (_value, _oldValue, onInvalidate) => {
    const snapshot = await database.ref('videos').child('actors').child(id.value).once('value');
    const value = snapshot.val();

    loadingStack.value.push(true);

    Vue.typedSet(videoCache.value, 'actors', value ? Object.keys(value) : []);

    onInvalidate(() => {
      loadingStack.value.pop();

      Vue.typedDelete(videoCache.value, 'actors');
    });
  }, { immediate: true });

  watch(id, async (_value, _oldValue, onInvalidate) => {
    const snapshot = await database.ref('videos').child('tags').child(id.value).once('value');
    const value = snapshot.val();

    loadingStack.value.push(true);

    Vue.typedSet(videoCache.value, 'tags', value ? Object.keys(value) : []);

    onInvalidate(() => {
      loadingStack.value.pop();

      Vue.typedDelete(videoCache.value, 'tags');
    });
  }, { immediate: true });

  watch(id, async (_value, _oldValue, onInvalidate) => {
    const snapshot = await database.ref('videos').child('voiceActors').child(id.value).once('value');
    const value = snapshot.val();

    loadingStack.value.push(true);

    Vue.typedSet(videoCache.value, 'voiceActors', value ? Object.keys(value) : []);

    onInvalidate(() => {
      loadingStack.value.pop();

      Vue.typedDelete(videoCache.value, 'voiceActors');
    });
  }, { immediate: true });

  return [
    video,
    isLoading,
  ] as const;
};
