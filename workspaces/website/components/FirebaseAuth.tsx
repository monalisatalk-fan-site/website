import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  auth,
  firebaseUserState,
  firebaseUserInitializedState,
} from '@/helpers';

export const FirebaseAuth: FC = () => {
  const setUserState = useSetRecoilState(firebaseUserState);
  const setUserInitializedState = useSetRecoilState(
    firebaseUserInitializedState
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserState(JSON.parse(JSON.stringify(user)));
      setUserInitializedState(true);
    });
  }, [setUserState, setUserInitializedState]);

  return null;
};
