import React, { FC, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { auth, useAuth } from '@/helpers';
import styles from './index.module.scss';

type Props = {
  className?: string;
  onlyGuest?: boolean;
};

export const AdminLayout: FC<Props> = ({
  children,
  className,
  onlyGuest = false,
}) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isLoading = useMemo(() => {
    return isLoggedIn == null || (onlyGuest && isLoggedIn);
  }, [isLoggedIn, onlyGuest]);

  const signOut = useCallback(async () => {
    await auth.signOut();
  }, []);

  useEffect(() => {
    if (!onlyGuest && isLoggedIn === false) {
      router.push({
        pathname: '/admin/login',
        query: {
          from: router.pathname,
        },
      });

      return;
    }

    if (onlyGuest && isLoggedIn) {
      router.push('/admin/dummy');
    }
  }, [router, isLoggedIn, onlyGuest]);

  return (
    <div className={cn(styles.adminAuth, className)}>
      <div className={styles.sidebar}>
        {isLoggedIn ? (
          <div>
            <button onClick={signOut}>サインアウト</button>
          </div>
        ) : null}
      </div>
      <div className={styles.main}>
        {isLoading ? <p>loading...</p> : children}
      </div>
    </div>
  );
};
