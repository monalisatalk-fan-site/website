import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalHeader } from '~/components/GlobalHeader';
import { GlobalFooter } from '~/components/GlobalFooter';

import 'reset-css/reset.css';
import '../assets/css/variables.css';
import '../assets/css/globals.css';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>
      <GlobalHeader />
      <Component {...pageProps} />
      <GlobalFooter />
    </>
  );
}

export default App;
