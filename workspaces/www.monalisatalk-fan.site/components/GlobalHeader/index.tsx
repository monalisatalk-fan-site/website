import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';

export const GlobalHeader: React.VFC = () => {
  return (
    <div className={styles.globalHeader}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/">
            <a className={styles.globalHeaderLogo}>
              <img src="/images/logo.svg" className={styles.image} />
            </a>
          </Link>
          <div className={styles.menu}>
            <nav className={styles.globalHeaderMenu}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Link href="/">
                    <a className={styles.link}>HOME</a>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/">
                    <a className={styles.link}>VIDEOS</a>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/">
                    <a className={styles.link}>GOODS</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
