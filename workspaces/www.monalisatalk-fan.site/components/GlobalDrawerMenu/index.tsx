import React from 'react';
import styles from './index.module.css';

export const GlobalDrawerMenu: React.VFC = () => {
  return (
    <>
      <div className={styles.hambargerMenu}>M</div>
      <div className={styles.drawerMenu}>Drawer menu</div>
    </>
  );
};
