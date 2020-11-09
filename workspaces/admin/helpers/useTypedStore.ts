import { useContext } from '@nuxtjs/composition-api';
import { DefineRootStore } from '@lollipop-onl/vuex-typesafe-helper';

import { Store as AuthStore } from '@/store/auth';
import { Store as UIStore } from '@/store/ui';
import { Store as VideoStore } from '@/store/video';

export type RootStore = DefineRootStore<AuthStore & UIStore & VideoStore>;

export const useTypedStore = (): RootStore => {
  const { store } = useContext();

  return store as RootStore;
};

export {};
