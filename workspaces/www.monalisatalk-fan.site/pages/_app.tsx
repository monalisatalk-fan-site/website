import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalHeader } from '~/components/GlobalHeader';

import 'reset-css/reset.css';
import '../assets/css/variables.css';
import '../assets/css/globals.css';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalHeader />
      <Component {...pageProps} />
    </>
  );
}

export default App;
