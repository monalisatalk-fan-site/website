import type React from 'react';
import { GetStaticProps } from 'next';
import clsx from 'clsx';
import { LayoutContainer } from '~/components/LayoutContainer';
import { TopHeroView } from '~/components/TopHeroView';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { UILinkButton } from '~/components/UILinkButton';
import { Video } from '~/types';
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
          <section className={styles.section}>
            <h1 className={styles.heading}>
              <img
                className={styles.image}
                src="/images/top/headings/latest-videos.svg"
                alt="最新動画のタイトル"
              />
            </h1>
            <SimpleVideoList videos={latestVideos} />
            <div className={styles.morebutton}>
              <UILinkButton href="/videos">
                新着順にすべての動画をみる
              </UILinkButton>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.heading}>
              <img
                className={styles.image}
                src="/images/top/headings/about.svg"
                alt="このウェブサイトについてのタイトル"
              />
            </h2>
            <p>lorem ipsum</p>
          </section>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default IndexPage;
