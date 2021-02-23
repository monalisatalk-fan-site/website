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
  const youtubeLink = useMemo(() => `https://www.youtube.com/watch?v=${video.id}`, [video.id]);
  const d = new Date(video.publishedAt);

  return (
    <article className={styles.videoDetailPage}>
      <LayoutContainer className={styles.container}>
        <div className={clsx(styles.thumbnail, styles.videoDetailThumbnail)}>
          <div className={styles.image}>
            <YouTubeThumbnail videoId={video.id} />
          </div>
          <a className={styles.link} href={youtubeLink} target="_blank" rel="noreferrer">
            <span className={styles.text}>
              YouTube で動画をみる
            </span>
          </a>
        </div>
        <div className={clsx(styles.related)}>
          {previousVideo ? (
            <Link href={`/v/${previousVideo.id}`}>
              <a>Previous: {previousVideo.title}</a>
            </Link>
          ) : null}
          <br />
          {nextVideo ? (
            <Link href={`/v/${nextVideo.id}`}>
              <a>Next: {nextVideo.title}</a>
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
            { video.description.split('\n').map((line, i) => (
              <p key={i} className={styles.paragraph}>{line}</p>
            )) }
          </div>
        </div>
      </LayoutContainer>
    </article>
  );
};

export default VideoDetailPage;
