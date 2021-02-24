import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalHeader } from '~/components/GlobalHeader';
import { GlobalFooter } from '~/components/GlobalFooter';
import { GlobalDrawerMenu } from '~/components/GlobalDrawerMenu';

import 'reset-css/reset.css';
import '../assets/css/variables.css';
import '../assets/css/globals.css';
import styles from './_app.module.css';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  useEffect(() => {
    const onResize = () => {
      const vh = window.innerHeight * 0.01;
      const { documentElement } = document;

      if (documentElement instanceof HTMLElement) {
        documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <div className={styles.appLayout}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>
      <GlobalHeader />
      <Component {...pageProps} />
      <div className={styles.footer}>
        <GlobalFooter />
      </div>
      <GlobalDrawerMenu />
    </div>
  );
}

export default App;
