import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <script async src="https://track.everyone.wtf/tracker.js" data-ackee-server="https://track.everyone.wtf" data-ackee-domain-id="09b365f0-130a-46d2-b7fe-eaf895915c45"></script>
        <script async src="https://inform.everyone.wtf/legal.min.js?small"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
};
