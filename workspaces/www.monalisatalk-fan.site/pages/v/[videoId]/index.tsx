import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { YouTubeThumbnail } from '~/components/YouTubeThumbnail';
import type Resources from '~/assets/data/resources.json';

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
  return (
    <div>
      this is a video page.
      <YouTubeThumbnail videoId={video.id} />
      <p>{video.title}</p>
      <p>{new Date(video.publishedAt).toLocaleDateString()}</p>
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
  );
};

export default VideoDetailPage;
