import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
