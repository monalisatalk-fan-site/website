import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './index.module.css';

export const GlobalDrawerMenu: React.VFC = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const openMenu = useCallback(() => {
    setMenuVisibility(true);
  }, [setMenuVisibility]);
  const closeMenu = useCallback(() => {
    setMenuVisibility(false);
  }, [setMenuVisibility]);

  return (
    <>
      <button
        className={styles.hambargerMenu}
        aria-label="ウェブサイトのメニューを開く"
        onClick={openMenu}
      >
        <span className={styles.bars} />
      </button>
      <div className={clsx(styles.drawerMenu, isMenuVisible && styles.Visible)}>
        <div className={styles.header}>
          <img className={styles.logo} src="/images/logo.svg" alt="" />
          <button
            className={styles.close}
            onClick={closeMenu}
            aria-label="メニューを閉じる"
          />
        </div>
        <nav className={styles.navigation}>
          <ul className={styles.drawerMenuNavigation}>
            <li className={styles.item}>
              <Link href="/">
                <a className={styles.link}>HOME</a>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/videos">
                <a className={styles.link}>VIDEOS</a>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/goods">
                <a className={styles.link}>GOODS</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
