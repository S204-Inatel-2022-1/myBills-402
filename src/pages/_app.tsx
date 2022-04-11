import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { FirebaseAuthProvider } from "../contexts/FirebaseAuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAuthProvider>
      <ChakraProvider >
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseAuthProvider>
  );
}

export default MyApp;
