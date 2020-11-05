import Vue from 'vue';
import { ActionContext } from 'vuex';
import type { VideoResource, VideoMeta, Video } from '@/types';
import { VideoResourceCache } from '@/utils';

export type State = {
  videos: Video[] | null;
  meta: VideoMeta | null;
};

export const state = (): State => ({
  videos: [],
  meta: null,
});

export const getters = {};

export const mutations = {
  setVideos: (state: State, videos: Video[]) => {
    state.videos = videos;
  },
  setVideoMeta: (state: State, meta: VideoMeta) => {
    state.meta = meta;
  },
};

export const actions = {
  async fetchVideoResources(
    this: Vue,
    { state, commit }: ActionContext<State, any>
  ): Promise<void> {
    if (state.meta) {
      return;
    }

    const cache = new VideoResourceCache();

    const metaResourceUrl = await this.$fire.storage
      .ref('resources/video-snippet/meta.json')
      .getDownloadURL();
    const metaRes = await fetch(metaResourceUrl);
    const meta: VideoMeta = await metaRes.json();

    commit('setVideoMeta', meta);

    if (cache.checkCacheAvailability(meta.updatedAt)) {
      commit('setVideos', cache.videos);

      return;
    }

    const videosResourceUrl = await this.$fire.storage
      .ref('resources/video-snippet/data.json')
      .getDownloadURL();
    const dataRes = await fetch(videosResourceUrl);
    const data: VideoResource = await dataRes.json();

    commit('setVideos', data.items);

    cache.update(data);
  },
};
