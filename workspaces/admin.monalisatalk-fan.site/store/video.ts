import { DefineActionContext, DefineStoreModule } from '@lollipop-onl/vuex-typesafe-helper';
import { BasicVideo, VoiceActor } from '@/types';
import { DatabaseStructure } from '@shared/types/database';

export type State = {
  basicVideoList: BasicVideo[];
  voiceActorList: VoiceActor[];
};

export const state = (): State => ({
  basicVideoList: [],
  voiceActorList: [],
});

export const getters = {};

export const mutations = {
  setBasicVideoList(state: State, basicVideoData: DatabaseStructure['videos']['basic']): void {
    state.basicVideoList = Object.entries(basicVideoData)
      .map(([id, body]) => ({ id, ...body }))
      .sort((a, b) => b.publishedAt - a.publishedAt);
  },
  setVoiceActorList(state: State, voiceActorData: DatabaseStructure['voiceActors']): void {
    state.voiceActorList = Object.entries(voiceActorData)
      .map(([id, body]) => ({ id, ...body }));
  },
};

type Ctx = DefineActionContext<State, typeof getters, typeof mutations>;

export const actions = {};

export type VideoStore = DefineStoreModule<'video', State, typeof getters, typeof mutations, typeof actions>;
