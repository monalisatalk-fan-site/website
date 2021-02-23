import React from 'react';
import { GetStaticProps } from 'next';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { LayoutContainer } from '~/components/LayoutContainer';
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
    <div>
      <LayoutContainer>
        <SimpleVideoList videos={videos} />
      </LayoutContainer>
    </div>
  );
};

export default VideosPage;
