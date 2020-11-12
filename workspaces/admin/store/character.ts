import Vue from 'vue';
import {
  Converter,
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import type { Character, DatabaseCharacter } from '@/types';

export type State = {
  isLoading: boolean;
  characters: Character[];
};

export const state = (): State => ({
  isLoading: false,
  characters: [],
});

export const getters = {};

export type Getters = Converter<typeof getters, {}>;

export const mutations = {
  setLoadingState: (state: State, isLoading: boolean) => {
    state.isLoading = isLoading;
  },
  setCharacters: (state: State, characters: Character[]) => {
    state.characters = characters;
  },
};

export type Mutations = Converter<
  typeof mutations,
  {
    setLoadingState: 'character/setLoadingState';
    setCharacters: 'character/setCharacters';
  }
>;

export type Ctx = DefineActionContext<State, typeof getters, typeof mutations>;

export const actions = {
  async fetchCharacters(this: Vue, { state, commit }: Ctx): Promise<void> {
    if (state.isLoading) {
      return;
    }

    try {
      commit('setLoadingState', true);

      const snapshot = await this.$fire.database
        .ref('characters')
        .once('value');
      const value: Record<string, DatabaseCharacter> | null = snapshot.val();

      if (!value) {
        commit('setCharacters', []);

        return;
      }

      const characters = Object.entries(value).map(([key, value]) => ({
        ...value,
        id: key,
      }));

      commit('setCharacters', characters);
    } finally {
      commit('setLoadingState', false);
    }
  },
};

export type Actions = Converter<
  typeof actions,
  {
    fetchCharacters: 'character/fetchCharacters';
  }
>;

export type Store = DefineStoreModule<
  'character',
  State,
  Getters,
  Mutations,
  Actions
>;
