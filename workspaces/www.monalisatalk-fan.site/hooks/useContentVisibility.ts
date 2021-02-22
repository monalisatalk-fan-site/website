import React, { useState, useEffect } from 'react';

export type UseContentVisibilityResult = {
  isContentVisible: boolean;
};

export const useContentVisibility = <T extends HTMLElement>(
  elementRef: React.MutableRefObject<T | null | undefined>
): UseContentVisibilityResult => {
  const [isContentVisible, setContentVisibility] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!elementRef.current) {
        return;
      }

      const { offsetTop } = elementRef.current;
      const { innerHeight, scrollY } = window;

      setContentVisibility(scrollY > offsetTop - innerHeight);
    };

    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [elementRef, setContentVisibility]);

  return {
    isContentVisible,
  };
};
