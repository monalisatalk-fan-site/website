import Vue from 'vue';
import {
  Converter,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';

export type State = {
  drawer: boolean | null;
};

export const state = (): State => ({
  drawer: true,
});

export const getters = {};

export type Getters = Converter<typeof getters, {}>;

export const mutations = {
  setDrawer(state: State, drawer: boolean): void {
    Vue.typedSet(state, 'drawer', drawer);
  },
};

export type Mutations = Converter<
  typeof mutations,
  {
    setDrawer: 'ui/setDrawer';
  }
>;

export const actions = {};

export type Actions = Converter<typeof actions, {}>;

export type Store = DefineStoreModule<'ui', State, Getters, Mutations, Actions>;
