import React from 'react';
import { AppProps } from 'next/app';

import 'reset-css/reset.css';
import '../assets/css/variables.css';
import './_app.css';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return <Component {...pageProps} />;
}

export default App;
