import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LayoutContainer } from '~/components/LayoutContainer';
import styles from './index.module.css';

export const GlobalFooter: React.VFC = () => {
  const { asPath } = useRouter();

  return (
    <footer className={styles.globalFooter}>
      <LayoutContainer className={styles.row}>
        <Link
          href={`https://docs.google.com/forms/d/e/1FAIpQLSdP42hQHN8b_m7dZipHuYgl8B0JGgecICDmrRRxU2NjDRPj4g/viewform?entry.356401281=${encodeURIComponent(
            asPath
          )}`}
        >
          <a className={styles.report} target="_blank" rel="noreferrer">
            データの不備を報告する
          </a>
        </Link>
        <Link href="https://twitter.com/monalisatalkfan">
          <a className={styles.twitter} target="_blank" rel="noreferrer">
            @monalisatalkfan
          </a>
        </Link>
        <small className={styles.copyright}>
          &copy; 2021 モナ・リザの戯言 非公式ファンサイト
        </small>
      </LayoutContainer>
      <div className={styles.hambargerarea} />
    </footer>
  );
};
