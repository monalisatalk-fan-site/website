import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { YouTubeThumbnail } from '~/components/YouTubeThumbnail';
import type resources from '~/assets/data/resources.json';

export type StaticProps = {
  videos: typeof resources.videos;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { videos } = await import('~/assets/data/resources.json');

  return {
    props: {
      videos,
    },
  };
};

export const VideosPage: React.VFC<StaticProps> = ({ videos }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {videos.map(({ id }) => (
        <div key={id} style={{ width: 100 }}>
          <Link href={`/v/${id}`}>
            <a>
              <YouTubeThumbnail videoId={id} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VideosPage;
