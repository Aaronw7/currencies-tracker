import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" color="white" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
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
