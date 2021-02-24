import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useReactiveState } from '@lollipop-onl/react-reactive-state';
import { UIReactiveInput } from '~/components/UIReactiveInput';
import {
  VideoSearchOrder,
  SEARCH_QUERY_KEYWORD,
  SEARCH_QUERY_ORDER,
  SEARCH_QUERY_PAGE,
} from '~/hooks/useVideoSearch';

export const VideoSearchForm: React.VFC = () => {
  const router = useRouter();
  const isInitialized = useReactiveState(false);
  const keyword = useReactiveState('');
  const order = useReactiveState<VideoSearchOrder>('latest');

  useEffect(() => {
    if (isInitialized.value || !router.isReady) {
      return;
    }

    const {
      [SEARCH_QUERY_KEYWORD]: currentKeyword,
      [SEARCH_QUERY_ORDER]: currentOrder,
    } = qs.parse(window.location.search.replace(/^\?/, ''));

    if (typeof currentKeyword === 'string') {
      keyword.value = currentKeyword;
    }

    if (typeof currentOrder === 'string') {
      switch (currentOrder) {
        case 'latest':
        case 'oldest':
        case 'views':
          order.value = currentOrder;
      }
    }

    isInitialized.value = true;
  }, [isInitialized, keyword, order, router]);

  useEffect(() => {
    if (!isInitialized.value) {
      return;
    }

    const { [SEARCH_QUERY_KEYWORD]: currentKeyword = '' } = router.query;
    const nextKeyword = keyword.value;

    if (currentKeyword === nextKeyword) {
      return;
    }

    router.replace({
      query: {
        ...router.query,
        [SEARCH_QUERY_PAGE]: 1,
        [SEARCH_QUERY_KEYWORD]: nextKeyword,
      },
    });
  }, [isInitialized, keyword, router]);

  useEffect(() => {
    if (!isInitialized.value) {
      return;
    }

    const { [SEARCH_QUERY_ORDER]: currentOrder = '' } = router.query;
    const nextOrder = order.value;

    if (currentOrder === nextOrder) {
      return;
    }

    router.replace({
      query: {
        ...router.query,
        [SEARCH_QUERY_PAGE]: 1,
        [SEARCH_QUERY_ORDER]: nextOrder,
      },
    });
  }, [isInitialized, order, router]);

  return (
    <div>
      <UIReactiveInput model={order} />
      <UIReactiveInput model={keyword} />
    </div>
  );
};
