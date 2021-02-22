import type React from 'react';
import clsx from 'clsx';
import { LayoutContainer } from '~/components/LayoutContainer';
import { TopHeroView } from '~/components/TopHeroView';
import styles from './index.module.css';

export const IndexPage: React.VFC = () => {
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
          <p>lorem ipsum</p>
          <h2 className={styles.heading}>
            <img
              className={styles.image}
              src="/images/top/headings/about.png"
              alt="このウェブサイトについて"
            />
          </h2>
          <p>lorem ipsum</p>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default IndexPage;
