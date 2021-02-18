import type React from 'react';
import styles from './index.module.css';

export const IndexPage: React.VFC = () => {
  return (
    <div className={styles.indexPage}>
      <img className={styles.logo} src="/images/logo.svg" width="173.76" height="29.808" title="MONA LISA TALK - FAN!!" />
      <p className={styles.message}>Coming soon</p>
    </div>
  );
};

export default IndexPage;
