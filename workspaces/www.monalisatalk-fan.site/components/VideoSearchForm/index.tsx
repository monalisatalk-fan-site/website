import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useReactiveState } from '@lollipop-onl/react-reactive-state';
import { UIReactiveInput } from '~/components/UIReactiveInput';
import { VideoSearchOrder, SEARCH_QUERY_KEYWORD, SEARCH_QUERY_ORDER, SEARCH_QUERY_PAGE } from '~/hooks/useVideoSearch';

export const VideoSearchForm: React.VFC = () => {
  const { replace, query } = useRouter();
  const isInitialized = useReactiveState(false);
  const keyword = useReactiveState('');
  const order = useReactiveState<VideoSearchOrder>('latest');

  useEffect(() => {
    if (isInitialized.value) {
      return;
    }

    const { [SEARCH_QUERY_KEYWORD]: currentKeyword, [SEARCH_QUERY_ORDER]: currentOrder } = qs.parse(
      window.location.search.replace(/^\?/, '')
    );

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
  }, [isInitialized, keyword, order]);

  useEffect(() => {
    if (!isInitialized.value) {
      return;
    }

    const { [SEARCH_QUERY_KEYWORD]: currentKeyword = '' } = query;
    const nextKeyword = keyword.value;

    if (currentKeyword === nextKeyword) {
      return;
    }

    replace({
      query: {
        ...query,
        [SEARCH_QUERY_PAGE]: 1,
        [SEARCH_QUERY_KEYWORD]: nextKeyword,
      },
    });
  }, [isInitialized, keyword, replace, query]);

  useEffect(() => {
    if (!isInitialized.value) {
      return;
    }

    const { [SEARCH_QUERY_ORDER]: currentOrder = '' } = query;
    const nextOrder = order.value;

    if (currentOrder === nextOrder) {
      return;
    }

    replace({
      query: {
        ...query,
        [SEARCH_QUERY_PAGE]: 1,
        [SEARCH_QUERY_ORDER]: nextOrder,
      },
    });
  }, [isInitialized, order, replace, query]);

  return (
    <div>
      <UIReactiveInput model={order} />
      <UIReactiveInput model={keyword} />
    </div>
  );
};
