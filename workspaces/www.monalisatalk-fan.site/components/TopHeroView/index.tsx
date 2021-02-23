import React from 'react';
import clsx from 'clsx';
import { YouTubeThumbnail } from '~/components/YouTubeThumbnail';
import styles from './index.module.css';

export type Props = {
  videos: string[][];
};

export const TopHeroView: React.VFC<Props> = ({ videos }) => {
  return (
    <div className={styles.topHeroView}>
      <div className={clsx(styles.band, styles.Reverse, styles.Red)}></div>
      <div className={styles.topHeroViewThumbnails}>
        {videos.map((videoIdList, i) => (
          <div key={i} className={styles.row}>
            {videoIdList.map((videoId) => (
              <div key={videoId} className={styles.item}>
                <YouTubeThumbnail videoId={videoId} />
              </div>
            ))}
            {videoIdList.map((videoId) => (
              <div key={videoId} className={styles.item}>
                <YouTubeThumbnail videoId={videoId} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={clsx(styles.band, styles.Blue)}></div>
    </div>
  );
};
