import { useState } from 'react';
import { ReactiveState } from '@/types';

export const useReactiveState = <T>(initialValue: T): ReactiveState<T> => {
  const [value, update] = useState<T>(initialValue);

  return {
    value,
    update,
  };
};
