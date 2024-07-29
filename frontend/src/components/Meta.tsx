import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <title>Currency Converter</title>
      <meta property="description" content="Currency conversion application utilizing NextJS and MapBox API. Currency API data includes information from 32 popularly traded currencies provided by FreeCurrencyAPI. Frontend deployed on Vercel. Backend deployed on Render." />
      <meta property="og:title" content="Currency Converter" />
      <meta property="og:description" content="Currency conversion application utilizing NextJS and MapBox API. Currency API data includes information from 32 popularly traded currencies provided by FreeCurrencyAPI. Frontend deployed on Vercel. Backend deployed on Render." />
      <meta property="og:image" content="https://currency-converter-steel-tau.vercel.app/logo.jpg" />
      <meta property="og:url" content="https://currency-converter-steel-tau.vercel.app" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="Currency Converter" />
      <meta property="twitter:description" content="Currency conversion application utilizing NextJS and MapBox API. Currency API data includes information from 32 popularly traded currencies provided by FreeCurrencyAPI. Frontend deployed on Vercel. Backend deployed on Render. " />
      <meta property="twitter:image" content="https://currency-converter-steel-tau.vercel.app/logo.jpg" />
    </Head>
  );
};

export default Meta;