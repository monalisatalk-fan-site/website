import React, { FC, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AdminSidebar } from '@/components/AdminSidebar';
import { auth, useAuth } from '@/helpers';

type Props = {
  onlyGuest?: boolean;
};

export const AdminLayout: FC<Props> = ({ children, onlyGuest = false }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isLoading = useMemo(() => {
    return isLoggedIn == null || (onlyGuest && isLoggedIn);
  }, [isLoggedIn, onlyGuest]);

  const signOut = useCallback(async () => {
    if (!window.confirm('管理画面からログアウトします。よろしいですか？')) {
      return;
    }

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
  }, [router, isLoggedIn, onlyGuest]);

  return (
    <div className="flex">
      <div className="flex-shrink-0 min-h-screen">
        <AdminSidebar isLoggedIn={isLoggedIn} signOut={signOut} />
      </div>
      <div className="flex-grow">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="w-full">
            <div className="w-full max-w-5xl px-6 mx-auto">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
