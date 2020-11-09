import Vue from 'vue';
import firebase from 'firebase/app';
import {
  Converter,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';

export type State = {
  isInitialized: boolean;
  user?: firebase.User;
};

export const state = (): State => ({
  isInitialized: false,
});

export const getters = {
  isSignedIn: (state: State): boolean => !!state.user,
};

export type Getters = Converter<
  typeof getters,
  {
    isSignedIn: 'auth/isSignedIn';
  }
>;

export const mutations = {
  setUser(state: State, user: firebase.User | null): void {
    Vue.typedSet(state, 'isInitialized', true);

    if (!user) {
      Vue.typedDelete(state, 'user');
    } else {
      Vue.typedSet(state, 'user', user);
    }
  },
};

export type Mutations = Converter<
  typeof mutations,
  {
    setUser: 'auth/setUser';
  }
>;

export const actions = {};

export type Actions = Converter<typeof actions, {}>;

export type Store = DefineStoreModule<
  'auth',
  State,
  Getters,
  Mutations,
  Actions
>;
