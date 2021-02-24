import React from 'react';
import styles from './index.module.css';

export const GlobalFooter: React.VFC = () => {
  return (
    <footer className={styles.globalFooter}>
      <small className={styles.copyright}>
        &copy; 2021 モナ・リザの戯言 ファンサイト
      </small>
      <div className={styles.hambargerarea} />
    </footer>
  );
};
