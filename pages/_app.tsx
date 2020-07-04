import * as React from 'react';

import "milligram/dist/milligram.min.css";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  require("preact/debug");
}


export default function MyApp({ Component, pageProps }) {
  return <div className='container'>
    <Component {...pageProps} />
  </div>;
}
