import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { FirebaseAuth } from '@/components/FirebaseAuth';
import '@/styles/tailwind.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <FirebaseAuth />
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
