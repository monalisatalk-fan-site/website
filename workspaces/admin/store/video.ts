import Vue from 'vue';
import {
  Converter,
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import type { VideoResource, Video } from '@/types';

export type State = {
  updatedAt: string | null;
  videos: Video[];
  error: Error | null;
};

export const state = (): State => ({
  videos: [],
  updatedAt: null,
  error: null,
});

export const getters = {};

export type Getters = Converter<typeof getters, {}>;

export const mutations = {
  setVideos: (state: State, videos: Video[]) => {
    state.videos = videos;
  },
  setUpdatedAt: (state: State, updatedAt: string | null) => {
    state.updatedAt = updatedAt;
  },
  setError: (state: State, error: Error | null) => {
    state.error = error;
  },
};

export type Mutations = Converter<
  typeof mutations,
  {
    setVideos: 'video/setVideos';
    setUpdatedAt: 'video/setUpdatedAt';
    setError: 'video/setError';
  }
>;

export type Ctx = DefineActionContext<State, typeof getters, typeof mutations>;

export const actions = {
  async fetchVideoResources(
    this: Vue,
    { state, commit }: Ctx,
    withCache = true
  ): Promise<void> {
    if (withCache && state.updatedAt) {
      return;
    }

    commit('setUpdatedAt', null);

    try {
      const videosResourceUrl = await this.$fire.storage
        .ref('resources/video-snippet/data.json')
        .getDownloadURL();
      const dataRes = await fetch(videosResourceUrl);
      const { items, updatedAt }: VideoResource = await dataRes.json();

      commit('setVideos', items);
      commit('setUpdatedAt', updatedAt);
      commit('setError', null);
    } catch (err) {
      commit('setVideos', []);
      commit('setError', err);
    }
  },
};

export type Actions = Converter<
  typeof actions,
  {
    fetchVideoResources: 'video/fetchVideoResources';
  }
>;

export type Store = DefineStoreModule<
  'video',
  State,
  Getters,
  Mutations,
  Actions
>;
