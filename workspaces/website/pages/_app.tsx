import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import 'reset-css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
