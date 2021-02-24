import React from 'react';
import styles from './index.module.css';

export const GlobalDrawerMenu: React.VFC = () => {
  return (
    <>
      <button className={styles.hambargerMenu}>M</button>
      <div className={styles.drawerMenu}>Drawer menu</div>
    </>
  );
};
