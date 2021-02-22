import React from 'react';
import { AppProps } from 'next/app';
import { GlobalHeader } from '~/components/GlobalHeader';

import 'reset-css/reset.css';
import '../assets/css/variables.css';
import '../assets/css/globals.css';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <GlobalHeader />
      <Component {...pageProps} />
    </>
  );
}

export default App;
