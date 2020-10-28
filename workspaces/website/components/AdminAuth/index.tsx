import React, { FC, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useAuth } from '@/helpers';
import styles from './index.module.scss';

type Props = {
  className?: string;
  onlyGuest?: boolean;
};

export const AdminAuth: FC<Props> = ({
  children,
  className,
  onlyGuest = false,
}) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isLoading = useMemo(() => {
    return isLoggedIn == null || (onlyGuest && isLoggedIn);
  }, [isLoggedIn, onlyGuest]);

  useEffect(() => {
    if (!onlyGuest && isLoggedIn === false) {
      router.push('/admin/login');

      return;
    }

    if (onlyGuest && isLoggedIn) {
      router.push('/admin');
    }
  }, [router, isLoggedIn, onlyGuest]);

  return (
    <div className={cn(styles.adminAuth, className)}>
      {isLoading ? <p>loading...</p> : children}
    </div>
  );
};
