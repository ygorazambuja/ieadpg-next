import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import { useEffect } from "react";
import { supabase } from "../database/supabaseClient";
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
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
