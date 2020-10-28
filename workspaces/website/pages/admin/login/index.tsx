import React, { FC, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { BaseInput } from '@/components/BaseInput';
import { useReactiveState, useAuth, auth } from '@/helpers';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const AdminLoginPage: FC<Props> = ({ className }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isLoading = useReactiveState(false);
  const email = useReactiveState('');
  const password = useReactiveState('');

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      isLoading.update(true);

      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
      } finally {
        isLoading.update(false);
      }
    },
    [email, password, isLoading]
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/admin');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>LOGIN</title>
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap"
        />
      </Head>
      <div className={cn(styles.adminLoginPage, className)}>
        <div className={styles.container}>
          <h1 className={styles.title}>LOGIN</h1>
          <form
            className={cn(styles.form, styles.loginForm)}
            onSubmit={onSubmit}
          >
            <BaseInput
              type="email"
              className={styles.field}
              placeholder="Email"
              value={email}
            />
            <BaseInput
              type="password"
              className={styles.field}
              placeholder="Password"
              value={password}
            />
            <button className={styles.submit} disabled={isLoading.value}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;