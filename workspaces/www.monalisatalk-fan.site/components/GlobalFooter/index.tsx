import React from 'react';
import styles from './index.module.css';

export const GlobalFooter: React.VFC = () => {
  return (
    <footer className={styles.globalFooter}>
      <p>&copy; 2021 モナ・リザの戯言 ファンサイト</p>
    </footer>
  )
};
