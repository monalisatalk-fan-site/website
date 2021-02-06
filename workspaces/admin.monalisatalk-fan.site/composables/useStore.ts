import { useContext } from '@nuxtjs/composition-api';
import { DefineRootStore } from '@lollipop-onl/vuex-typesafe-helper';
import { VideoStore } from '@/store/video';

type RootStore = DefineRootStore<VideoStore>;

export const useStore = () => {
  const { store } = useContext();

  return (store as unknown) as RootStore;
};
