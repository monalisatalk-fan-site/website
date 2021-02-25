import React from 'react';
import { ReactiveState, useReactiveState } from '@lollipop-onl/react-reactive-state';
import { SelectOption, BaseSelect } from '~/components/BaseSelect';
import { VideoSearchOrder } from '~/hooks/useVideoSearch';

export const OPTIONS: SelectOption<VideoSearchOrder>[] = [
  { value: 'latest', label: '最新' },
  { value: 'oldest', label: '最古' },
  { value: 'views', label: '再生回数' },
];

export type Props = {
  model: ReactiveState<VideoSearchOrder>;
};

export const VideoSearchFormOrderSelect: React.VFC<Props> = ({ model }) => {
  const label = useReactiveState('');

  return (
    <BaseSelect model={model} options={OPTIONS} label={label}>
      <p>{label.value}</p>
    </BaseSelect>
  )
};
