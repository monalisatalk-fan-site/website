import React from 'react';
import { GetStaticProps } from 'next';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { UIHeading } from '~/components/UIHeading';
import { UIPagination } from '~/components/UIPagination';
import { VideoSearchForm } from '~/components/VideoSearchForm';
import { LayoutContainer } from '~/components/LayoutContainer';
import type resources from '~/assets/data/resources.json';
import { useVideoSearch } from '~/hooks/useVideoSearch';
import styles from './index.module.css';

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
  const { videosPerPage, totalVideos, page, totalPages } = useVideoSearch(
    videos
  );

  return (
    <div className={styles.videosPage}>
      <LayoutContainer className={styles.container}>
        <UIHeading
          title="漫画動画"
          description={`${totalVideos}件の動画 (${page}/${totalPages})`}
        />
        <VideoSearchForm />
        {videosPerPage.length > 0 ? (
          <>
            <SimpleVideoList videos={videosPerPage} />
            <div className={styles.pagination}>
              <UIPagination page={page} totalPages={totalPages} />
            </div>
          </>
        ) : (
          <p>videos not found.</p>
        )}
      </LayoutContainer>
    </div>
  );
};

export default VideosPage;
