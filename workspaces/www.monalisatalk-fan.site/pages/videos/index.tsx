import React from 'react';
import { GetStaticProps } from 'next';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { UIHeading } from '~/components/UIHeading';
import { UIPagination } from '~/components/UIPagination';
import { VideoSearchForm } from '~/components/VideoSearchForm';
import { LayoutContainer } from '~/components/LayoutContainer';
import type resources from '~/assets/data/resources.json';
import { useVideoSearch } from '~/hooks/useVideoSearch';

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
    <div>
      <LayoutContainer>
        <UIHeading title="漫画動画" description={`${totalVideos}件の動画`} />
        <VideoSearchForm />
        {videosPerPage.length > 0 ? (
          <>
            <SimpleVideoList videos={videosPerPage} />
            <UIPagination page={page} totalPages={totalPages} />
          </>
        ) : (
          <p>videos not found.</p>
        )}
      </LayoutContainer>
    </div>
  );
};

export default VideosPage;
