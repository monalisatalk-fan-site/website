import type React from 'react';
import { GetStaticProps } from 'next';
import clsx from 'clsx';
import { LayoutContainer } from '~/components/LayoutContainer';
import { TopHeroView } from '~/components/TopHeroView';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { Video } from  '~/types';
import styles from './index.module.css';

export type StaticProps = {
  latestVideos: Video[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { videos } = await import('~/assets/data/resources.json');
  const latestVideos = videos.slice().splice(0, 4);

  return {
    props: {
      latestVideos,
    },
  };
};

export const IndexPage: React.VFC<StaticProps> = ({ latestVideos }) => {
  return (
    <div className={styles.indexPage}>
      <TopHeroView />
      <LayoutContainer>
        <div className={styles.pageContainer}>
          <h2 className={clsx(styles.heading, styles.Right)}>
            <img
              className={styles.image}
              src="/images/top/headings/latest-videos.png"
              alt="最新動画のタイトル"
            />
          </h2>
          <SimpleVideoList videos={latestVideos} />
          <h2 className={styles.heading}>
            <img
              className={styles.image}
              src="/images/top/headings/about.png"
              alt="このウェブサイトについてのタイトル"
            />
          </h2>
          <p>lorem ipsum</p>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default IndexPage;
