import { useContext } from '@nuxtjs/composition-api';
import { TypedDatabase } from '@shared/types/database';

export const useDatabase = () => {
  const { app } = useContext();

  return (app.$fire.database as unknown) as TypedDatabase;
};
