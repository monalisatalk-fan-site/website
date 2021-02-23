import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): React.ReactElement {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script src="//platform.twitter.com/widgets.js" async />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
