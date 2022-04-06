import * as React from 'react';

import "milligram/dist/milligram.min.css";


export default function MyApp({ Component, pageProps }) {
  return <div className='container'>
    <Component {...pageProps} />
  </div>;
}
