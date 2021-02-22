import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { YouTubeThumbnail } from '~/components/YouTubeThumbnail';
import { formatDate } from '~/helpers/format-date';
import { Video } from '~/types';
import styles from './index.module.css';

export type Props = {
  videos: Video[];
};

export const SimpleVideoList: React.VFC<Props> = ({ videos }) => {
  return (
    <ul className={styles.simpleVideoList}>
      {videos.map((video) => {
        const d = new Date(video.publishedAt);
        const iosDateTime = d.toISOString();
        const date = formatDate(d);

        return (
          <li key={video.id} className={styles.item}>
            <Link href={`/v/${video.id}`}>
              <a className={styles.link}>
                <div className={styles.thumbnail}>
                  <YouTubeThumbnail videoId={video.id} />
                </div>
                <div
                  className={clsx(
                    styles.details,
                    styles.simpleVideoListDetails
                  )}
                >
                  <time className={styles.date} dateTime={iosDateTime}>
                    {date}
                  </time>
                  <div className={styles.title}>{video.title}</div>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
