import firebase from 'firebase/app';
import { useMemo } from 'react';
import { atom, useRecoilValue } from 'recoil';

type AuthHook = {
  isLoggedIn: boolean | null;
  user: firebase.User | null;
};

export const firebaseUserState = atom<firebase.User | null>({
  key: 'firebaseUserState',
  default: null,
});

export const firebaseUserInitializedState = atom<boolean | null>({
  key: 'firebaseUserInitializeState',
  default: null,
});

export const useAuth = (): AuthHook => {
  const user = useRecoilValue(firebaseUserState);
  const isInitialized = useRecoilValue(firebaseUserInitializedState);
  const isLoggedIn = useMemo(() => (isInitialized == null ? null : !!user), [
    user,
    isInitialized,
  ]);

  return {
    isLoggedIn,
    user,
  };
};
