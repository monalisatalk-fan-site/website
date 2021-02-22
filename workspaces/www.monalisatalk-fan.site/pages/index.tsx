import type React from 'react';
import { TopHeroView } from '~/components/TopHeroView';
import styles from './index.module.css';

export const IndexPage: React.VFC = () => {
  return (
    <div className={styles.indexPage}>
      <TopHeroView />
    </div>
  );
};

export default IndexPage;
