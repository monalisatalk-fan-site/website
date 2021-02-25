import React, { isValidElement, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import qs from 'qs';
import { SEARCH_QUERY_PAGE } from '~/hooks/useVideoSearch';
import { clamp } from '~/helpers/clamp';
import styles from './index.module.css';

export type Props = {
  page: number;
  totalPages: number;
};

export const UIPagination: React.VFC<Props> = ({ page, totalPages }) => {
  const { query, pathname } = useRouter();

  const pages = useMemo((): number[] => {
    const beginPage = clamp(page - 2, { min: 1 });
    const finishPage = clamp(beginPage + 4, { max: totalPages });
    const pages: number[] = [];

    for (let p = beginPage; p <= finishPage; p += 1) {
      pages.push(p);
    }

    return pages;
  }, [page, totalPages]);

  const isFirstPageVisible = useMemo((): boolean => !pages.includes(1), [pages]);

  const isFinalPageVisible = useMemo((): boolean => !pages.includes(totalPages), [totalPages, pages]);

  const isPreviousButtonVisible = useMemo((): boolean => page !== 1, [page]);

  const isNextButtonVisible = useMemo((): boolean => page !== totalPages, [page, totalPages]);

  const getPageLink = useCallback(
    (pageNumber: number): string =>
      [
        pathname,
        qs.stringify(
          { ...query, [SEARCH_QUERY_PAGE]: pageNumber },
          { arrayFormat: 'repeat' }
        ),
      ].join('?'),
    [pathname, query]
  );

  return (
    <div className={styles.uiPagination}>
      { isPreviousButtonVisible ? (
        <Link href={getPageLink(page - 1)}>
          <a className={styles.button}>＜</a>
        </Link>
      ) : null }
      <ol className={styles.list}>
        { isFirstPageVisible ? (
          <li className={styles.item}>
            <Link href={getPageLink(1)}><a className={clsx(styles.page, styles.Link)}>1</a></Link>
            <span className={styles.dots}>...</span>
          </li>
        ) : null}
        {pages.map((p) => {
            return (
              <li key={p} className={styles.item}>
                {page === p ? (
                  <span className={styles.page}>{p}</span>
                ) : (
                  <Link href={getPageLink(p)}>
                    <a className={clsx(styles.page, styles.Link)}>{p}</a>
                  </Link>
                )}
              </li>
            );
          })}
          { isFinalPageVisible ? (
            <li className={styles.item}>
              <span className={styles.dots}>...</span>
              <Link href={getPageLink(totalPages)}><a className={clsx(styles.page, styles.Link)}>{totalPages}</a></Link>
            </li>
          ) : null }
      </ol>
      { isNextButtonVisible ? (
        <Link href={getPageLink(page + 1)}>
          <a className={styles.button}>＞</a>
        </Link>
      ) : null }
    </div>
  );
};
