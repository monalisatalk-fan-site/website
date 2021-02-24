import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

export const GlobalDrawerMenu: React.VFC = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const openMenu = useCallback(() => {
    const { documentElement } = document;

    if (documentElement instanceof HTMLElement) {
      documentElement.style.setProperty('--body-scroll', 'hidden');
    }

    setMenuVisibility(true);
  }, [setMenuVisibility]);
  const closeMenu = useCallback(() => {
    const { documentElement } = document;

    if (documentElement instanceof HTMLElement) {
      documentElement.style.removeProperty('--body-scroll');
    }

    setMenuVisibility(false);
  }, [setMenuVisibility]);

  return (
    <>
      <button className={styles.hambargerMenu} onClick={openMenu}>
        M
      </button>
      <div className={clsx(styles.drawerMenu, isMenuVisible && styles.Visible)}>
        Drawer menu
        <button onClick={closeMenu}>Close menu</button>
      </div>
    </>
  );
};
