import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useReactiveState } from '@lollipop-onl/react-reactive-state';
import { UIReactiveInput } from '~/components/UIReactiveInput';
import { SEARCH_QUERY_KEYWORD } from '~/hooks/useVideoSearch';

export const VideoSearchForm: React.VFC = () => {
  const { replace, query } = useRouter();
  const isInitialized = useReactiveState(false);
  const keyword = useReactiveState('');

  useEffect(() => {
    if (isInitialized.value) {
      return;
    }

    const { [SEARCH_QUERY_KEYWORD]: currentKeyword } = query;

    if (typeof currentKeyword !== 'string') {
      return;
    }

    keyword.value = currentKeyword;

    return () => {
      isInitialized.value = true;
    };
  }, [isInitialized, keyword, query]);

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
        [SEARCH_QUERY_KEYWORD]: nextKeyword,
      },
    });
  }, [isInitialized, keyword, replace, query]);

  return (
    <div>
      <UIReactiveInput model={keyword} />
    </div>
  );
};
