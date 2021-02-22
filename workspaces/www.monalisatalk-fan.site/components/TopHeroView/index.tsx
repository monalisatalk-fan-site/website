import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { YouTubeThumbnail } from '~/components/YouTubeThumbnail';
import styles from './index.module.css';

export const TopHeroView: React.VFC = () => {
  const [videos, setVideos] = useState<string[][]>([]);

  useEffect(() => {
    import('~/assets/data/resources.json').then(({ videos }) => {
      const results: string[][] = [];

      for (let i = 0; i < 3; i += 1) {
        const result: string[] = [];

        for (let j = 0; j < 10; j += 1) {
          const video = videos[Math.floor(Math.random() * videos.length)];

          if (!video) {
            j -= 1;

            continue;
          }

          const { id } = video;

          if (result.includes(id) || results.some((videoIdList) => videoIdList.includes(id))) {
            j -= 1;

            continue;
          }

          result.push(id);
        }

        results.push(result);
      }

      setVideos(results);
    });
  }, [setVideos]);

  return (
    <div className={styles.topHeroView}>
      <div className={clsx(styles.band, styles.Red)}></div>
      <div className={styles.topHeroViewThumbnails}>
        {videos.map((videoIdList, i) => (
          <div key={i} className={styles.row}>
            { videoIdList.map((videoId) => (
              <div key={videoId} className={styles.item}>
                <YouTubeThumbnail videoId={videoId} />
              </div>
            )) }
            { videoIdList.map((videoId) => (
              <div key={videoId} className={styles.item}>
                <YouTubeThumbnail videoId={videoId} />
              </div>
            )) }
          </div>
        ))}
      </div>
      <div className={clsx(styles.band, styles.Reverse, styles.Blue)}></div>
    </div>
  );
};
