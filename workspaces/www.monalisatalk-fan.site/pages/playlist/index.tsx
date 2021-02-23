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
  const { videos } = await import('~/assets/data/resources.json');

  return {
    props: {
      videos,
    },
  };
};

const PlaylistPage: React.VFC<StaticProps> = ({ videos }) => {
  const { query } = useRouter();
  const playlist = useMemo(() => {
    const { v } = query;
    const videoIdList = Array.isArray(v) ? v : [v];

    return videoIdList
      .map((videoId) => videos.find(({ id }) => id === videoId))
      .filter((video): video is NonNullable<typeof video> => video != null);
  }, [videos, query]);

  return (
    <article className={styles.playlistPage}>
      <LayoutContainer className={styles.container}>
        <UIHeading
          title="プレイリスト"
          description={`${playlist.length}件の動画`}
        />
        <div className={styles.playlist}>
          <SimpleVideoList videos={playlist} />
        </div>
      </LayoutContainer>
    </article>
  );
};

export default PlaylistPage;
