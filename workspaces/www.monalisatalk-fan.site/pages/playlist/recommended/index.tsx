import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { LayoutContainer } from '~/components/LayoutContainer';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { UIHeading } from '~/components/UIHeading';
import { Video } from '~/types';
import styles from './index.module.css';

export type StaticProps = {
  videos: Video[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { recommendedVideos } = await import('~/assets/data/resources.json');

  return {
    props: {
      videos: recommendedVideos,
    },
  };
};

const PlaylistRecommendedPage: React.VFC<StaticProps> = ({ videos }) => {
  return (
    <article className={styles.playlistPage}>
      <LayoutContainer className={styles.container}>
        <UIHeading
          title="おすすめのマンガ動画"
          description={`${videos.length}件の動画`}
        />
        <div className={styles.playlist}>
          <SimpleVideoList videos={videos} />
        </div>
      </LayoutContainer>
    </article>
  );
};

export default PlaylistRecommendedPage;
