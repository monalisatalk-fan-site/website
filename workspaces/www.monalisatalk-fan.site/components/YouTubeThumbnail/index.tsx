import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useReactiveState } from '@lollipop-onl/react-reactive-state';
import styles from './index.module.css';
import { useContentVisibility } from '~/hooks/useContentVisibility';

export type Props = {
  videoId: string;
};

const cache: Map<string, HTMLImageElement> = new Map();

export const YouTubeThumbnail: React.VFC<Props> = ({ videoId }) => {
  const fallbackImageUrl = useReactiveState<string>();
  const imageUrl = useMemo(
    () => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    [videoId]
  );
  const [isLoading, setLoadingStatus] = useState<boolean>(() => {
    return !cache.has(imageUrl) && false;
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isContentVisible } = useContentVisibility(containerRef);

  useEffect(() => {
    // FIXME: 暫定的に画像でサムネイルを表示する
    if (Math.random() >= 0) {
      fallbackImageUrl.value = imageUrl;

      return;
    }

    const cachedImage = cache.get(imageUrl);

    const drawThumbnail = (img: HTMLImageElement) => {
      if (!canvasRef.current) {
        setLoadingStatus(false);

        fallbackImageUrl.value = imageUrl;

        return;
      }

      const ctx = canvasRef.current.getContext('2d');

      if (!ctx) {
        setLoadingStatus(false);

        fallbackImageUrl.value = imageUrl;

        return;
      }

      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
    };

    if (cachedImage) {
      setLoadingStatus(false);

      drawThumbnail(cachedImage);

      return;
    }

    setLoadingStatus(true);

    if (!isContentVisible) {
      return;
    }

    const img = new Image();

    img.onload = () => {
      setLoadingStatus(false);

      drawThumbnail(img);

      cache.set(imageUrl, img);
    };

    img.onerror = () => {
      setLoadingStatus(false);

      fallbackImageUrl.value = imageUrl;
    };

    img.src = imageUrl;
  }, [
    canvasRef,
    fallbackImageUrl,
    isLoading,
    isContentVisible,
    videoId,
    imageUrl,
  ]);

  return (
    <div className={styles.youtubeThumbnail} ref={containerRef}>
      {fallbackImageUrl.value ? (
        <img className={styles.image} src={fallbackImageUrl.value} />
      ) : (
        <canvas className={styles.image} ref={canvasRef} />
      )}
      <p className={clsx(styles.loading, isLoading && styles.Active)}>
        loading...
      </p>
    </div>
  );
};
