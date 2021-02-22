import React, { useEffect, useRef } from 'react';
import { useReactiveState } from '@lollipop-onl/react-reactive-state';
import { useContentVisibility } from '~/hooks/useContentVisibility';

export type Props = {
  tweetId: string;
  theme?: 'dark' | 'light';
};

export const EmbededTweet: React.VFC<Props> = ({
  tweetId,
  theme = 'light',
}) => {
  const isLoading = useReactiveState(false);
  const isLoaded = useReactiveState(false);
  const targetElement = useRef<HTMLDivElement | null>(null);
  const { isContentVisible } = useContentVisibility(targetElement);

  useEffect(() => {
    if (!window.twttr || !targetElement.current || isLoaded.value) {
      return;
    }

    isLoading.value = true;

    let currentEmbededTweet: HTMLElement | undefined;
    let isCancelled = false;

    if (!isContentVisible) {
      currentEmbededTweet?.remove();

      return;
    }

    window.twttr.widgets
      .createTweet(tweetId, targetElement.current, {
        theme: theme === 'dark' ? theme : undefined,
      })
      .then((el) => {
        if (isCancelled || !isContentVisible) {
          el.remove();

          return;
        }

        currentEmbededTweet = el;
        isLoaded.value = true;
      })
      .finally(() => {
        isLoading.value = false;
      });

    return () => {
      isCancelled = true;

      currentEmbededTweet?.remove();
    };
  }, [targetElement, isContentVisible, tweetId, theme, isLoading, isLoaded]);

  return (
    <>
      <div style={{ minHeight: 240, background: '#eee' }} ref={targetElement} />
      {isLoading.value ? 'loading...' : null}
    </>
  );
};
