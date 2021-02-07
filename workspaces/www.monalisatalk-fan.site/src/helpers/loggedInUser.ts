import type firebase from 'firebase';
import { readable } from 'svelte/store';
import { auth } from './firebase-app';
import { LoadableResource } from '../types';

type LoggedInUser = { loggedInUser: firebase.User | null };
type LoggedInUserState = LoadableResource<LoggedInUser, firebase.auth.Error>;

const initialState: LoggedInUserState = {
  loggedInUser: null,
  isLoading: true,
  error: null,
};

/** ログインしたユーザー情報 */
export default readable<LoggedInUserState>(initialState, (set) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    set({
      loggedInUser: user,
      isLoading: false,
      error: null,
    });
  }, (error) => {
    set({
      loggedInUser: null,
      isLoading: false,
      error,
    });
  });

  return () => {
    unsubscribe();
  };
});
