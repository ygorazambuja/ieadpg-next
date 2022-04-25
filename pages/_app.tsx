import "../styles/globals.css";
import { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

function MyApp({ Component, pageProps }: AppProps) {
  const { initSubscriptions } = useSupabaseAuth();

  useEffect(() => {
    initSubscriptions();
  }, [initSubscriptions]);

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <CSSReset />
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
