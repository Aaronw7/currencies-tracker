import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import theme from "@/theme";
import Meta from "@/components/Meta";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
