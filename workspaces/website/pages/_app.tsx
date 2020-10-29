import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { FirebaseAuth } from '@/components/FirebaseAuth';
import '@/styles/main.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Head>
        <title>【非公式】モナ・リザの戯言 ファンサイト</title>
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap"
        />
      </Head>
      <FirebaseAuth />
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
