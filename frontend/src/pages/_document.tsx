import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" color="white" />
        <link
          rel="preload"
          href="/_next/static/fonts/merriweather-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="author" content="Aaron W" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
