import React, { FC, useCallback } from 'react';
import { ReactiveState } from '@/types';

type Props = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'value' | 'defaultValue'
> & {
  value: ReactiveState<string>;
};

export const BaseInput: FC<Props> = ({ value, ...props }) => {
  const onInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      value.update(e.currentTarget.value);
    },
    [value]
  );

  return <input onInput={onInput} defaultValue={value.value} {...props} />;
};
