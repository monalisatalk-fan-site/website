import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

export const GlobalDrawerMenu: React.VFC = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const openMenu = useCallback(() => setMenuVisibility(true), [setMenuVisibility]);
  const closeMenu = useCallback(() => setMenuVisibility(false), [setMenuVisibility]);

  return (
    <>
      <button className={styles.hambargerMenu} onClick={openMenu}>M</button>
      <div className={clsx(styles.drawerMenu, isMenuVisible && styles.Visible)}>
        Drawer menu
        <button onClick={closeMenu}>Close menu</button>
      </div>
    </>
  );
};
