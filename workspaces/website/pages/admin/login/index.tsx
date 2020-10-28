import React, { FC, useCallback } from 'react';
import Head from 'next/head';
import { BaseInput } from '@/components/BaseInput';
import { AdminLayout } from '@/components/AdminLayout';
import { useReactiveState, auth } from '@/helpers';

const AdminLoginPage: FC = () => {
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

  return (
    <AdminLayout onlyGuest>
      <Head>
        <title>LOGIN</title>
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap"
        />
      </Head>
      <div>
        <div>
          <h1>LOGIN</h1>
          <form onSubmit={onSubmit}>
            <BaseInput type="email" placeholder="Email" value={email} />
            <BaseInput
              type="password"
              placeholder="Password"
              value={password}
            />
            <button disabled={isLoading.value}>LOGIN!</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLoginPage;
