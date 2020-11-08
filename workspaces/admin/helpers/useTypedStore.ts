import { useContext } from '@nuxtjs/composition-api';
import { DefineRootStore } from '@lollipop-onl/vuex-typesafe-helper';

import { Store as AuthStore } from '@/store/auth';
import { Store as UIStore } from '@/store/ui';

export type RootStore = DefineRootStore<AuthStore & UIStore>;

export const useTypedStore = (): RootStore => {
  const { store } = useContext();

  return store as RootStore;
};

export {};
