import React, { useCallback } from 'react';
import { ReactiveState } from '@lollipop-onl/react-reactive-state';
import { noop } from '~/helpers/noop';

export type InputAttributes = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type Props = Omit<InputAttributes, 'defaultValue'> & {
  model: ReactiveState<InputAttributes['defaultValue']>;
};

export const UIReactiveInput: React.VFC<Props> = ({
  model,
  onInput = noop,
  ...props
}) => {
  const emitInputValue = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.target instanceof HTMLInputElement) {
        model.value = e.target.value;
      }

      onInput(e);
    },
    [model, onInput]
  );

  return (
    <input defaultValue={model.value} onInput={emitInputValue} {...props} />
  );
};
