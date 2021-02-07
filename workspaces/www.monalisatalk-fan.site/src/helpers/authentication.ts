import type firebase from 'firebase';
import { readable } from 'svelte/store';
import { auth } from './firebase-app';

/** ログインしたユーザー情報 */
export const loggedInUser = readable<firebase.User | null>(null, (set) => {
  console.log('initialize watcher')

  const unsubscribe = auth.onAuthStateChanged((user) => {
    set(user);
  });

  // @ts-expect-error
  setTimeout(() => set(100), 1000);

  return () => {
    unsubscribe();
  };
});
