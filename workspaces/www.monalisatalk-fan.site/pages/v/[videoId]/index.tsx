import React, { useMemo } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import { YouTubeThumbnail } from '~/components/YouTubeThumbnail';
import { LayoutContainer } from '~/components/LayoutContainer';
import { formatDate } from '~/helpers/format-date';
import type Resources from '~/assets/data/resources.json';
import styles from './index.module.css';

export type StaticProps = {
  video: typeof Resources.videos[number];
  previousVideo: typeof Resources.videos[number] | null;
  nextVideo: typeof Resources.videos[number] | null;
};

export type PageParams = {
  videoId: string;
};

export const getStaticProps: GetStaticProps<StaticProps, PageParams> = async ({
  params,
}) => {
  const { videos } = await import('~/assets/data/resources.json');
  const index = videos.findIndex(({ id }) => id === params?.videoId);
  const video = videos[index];

  if (!video) {
    return {
      notFound: true,
    };
  }

  const previousVideo = videos[index + 1] || null;
  const nextVideo = videos[index - 1] || null;

  return {
    props: {
      video,
      previousVideo,
      nextVideo,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const { videos } = await import('~/assets/data/resources.json');

  return {
    paths: videos.map(({ id }) => ({ params: { videoId: id } })),
    fallback: false,
  };
};

export const VideoDetailPage: React.VFC<StaticProps> = ({
  video,
  nextVideo,
  previousVideo,
}) => {
  const youtubeLink = useMemo(
    () => `https://www.youtube.com/watch?v=${video.id}`,
    [video.id]
  );
  const d = new Date(video.publishedAt);

  return (
    <article className={styles.videoDetailPage}>
      <LayoutContainer className={styles.container}>
        <div className={clsx(styles.thumbnail, styles.videoDetailThumbnail)}>
          <div className={styles.image}>
            <YouTubeThumbnail videoId={video.id} />
          </div>
          <a
            className={styles.link}
            href={youtubeLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.text}>YouTube で動画をみる</span>
          </a>
        </div>
        <div className={clsx(styles.related, styles.videoDetailRelated)}>
          {nextVideo ? (
            <Link href={`/v/${nextVideo.id}`}>
              <a className={styles.item}>
                <span className={styles.label}>次の動画</span>
                <span className={styles.title}>{nextVideo.title}</span>
              </a>
            </Link>
          ) : (
            <span className={clsx(styles.item, styles.Disabled)}>
              <span className={styles.label}>次の動画</span>
              <span className={styles.title}>この動画が最新です</span>
            </span>
          )}
          {previousVideo ? (
            <Link href={`/v/${previousVideo.id}`}>
              <a className={styles.item}>
                <span className={styles.label}>前の動画</span>
                <span className={styles.title}>{previousVideo.title}</span>
              </a>
            </Link>
          ) : null}
        </div>
        <div className={clsx(styles.body, styles.videoDetailBody)}>
          <h1 className={styles.title}>{video.title}</h1>
          <div className={styles.date}>
            <time dateTime={d.toISOString()}>{formatDate(d)}</time>
          </div>
          <div className={styles.description}>
            {video.description.split('\n').map((line, i) => (
              <p key={i} className={styles.paragraph}>
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className={clsx(styles.body, styles.videoDetailBody)}>
          <h1 className={styles.title}>{video.title}</h1>
          <div className={styles.date}>
            <time dateTime={d.toISOString()}>{formatDate(d)}</time>
          </div>
          <div className={styles.description}>
            {video.description.split('\n').map((line, i) => (
              <p key={i} className={styles.paragraph}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </article>
  );
};

export default VideoDetailPage;
