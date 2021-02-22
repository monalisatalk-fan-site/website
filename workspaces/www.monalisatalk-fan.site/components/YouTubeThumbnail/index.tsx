import React, { useEffect, useRef } from 'react';
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
  const isLoading = useReactiveState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isContentVisible } = useContentVisibility(containerRef);

  useEffect(() => {
    const imageUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const cachedImage = cache.get(imageUrl);

    const drawThumbnail = (img: HTMLImageElement) => {
      if (!canvasRef.current) {
        isLoading.value = false;

        fallbackImageUrl.value = imageUrl;

        return;
      }

      const ctx = canvasRef.current.getContext('2d');

      if (!ctx) {
        isLoading.value = false;

        fallbackImageUrl.value = imageUrl;

        return;
      }

      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
    };

    if (cachedImage) {
      isLoading.value = false;

      drawThumbnail(cachedImage);

      return;
    }

    if (!isContentVisible) {
      return;
    }

    const img = new Image();

    img.onload = () => {
      isLoading.value = false;

      drawThumbnail(img);

      cache.set(imageUrl, img);
    };

    img.onerror = () => {
      isLoading.value = false;

      fallbackImageUrl.value = imageUrl;
    };

    img.src = imageUrl;
  }, [canvasRef, fallbackImageUrl, isLoading, isContentVisible, videoId]);

  return (
    <div className={styles.youtubeThumbnail} ref={containerRef}>
      {fallbackImageUrl.value ? (
        <img className={styles.image} src={fallbackImageUrl.value} />
      ) : (
        <canvas className={styles.image} ref={canvasRef} />
      )}
      <p className={clsx(styles.loading, isLoading.value && styles.Active)}>
        loading...
      </p>
    </div>
  );
};
