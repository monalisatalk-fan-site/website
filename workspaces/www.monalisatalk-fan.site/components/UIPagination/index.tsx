import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import qs from 'qs';
import { SEARCH_QUERY_PAGE } from '~/hooks/useVideoSearch';
import styles from './index.module.css';

export type Props = {
  page: number;
  totalPages: number;
};

export const UIPagination: React.VFC<Props> = ({ page, totalPages }) => {
  const { query, pathname } = useRouter();

  return (
    <div className={styles.uiPagination}>
      <ol className={styles.list}>
        {Array.from({ length: totalPages })
          .fill(null)
          .map((_, i) => {
            const pageNumber = i + 1;
            const href = [
              pathname,
              qs.stringify(
                { ...query, [SEARCH_QUERY_PAGE]: pageNumber },
                { arrayFormat: 'repeat' }
              ),
            ].join('?');

            return (
              <li key={i} className={styles.item}>
                {page === pageNumber ? (
                  <span>{pageNumber}</span>
                ) : (
                  <Link href={href}>
                    <a>{pageNumber}</a>
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </div>
  );
};
