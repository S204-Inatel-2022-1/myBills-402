import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { FirebaseAuthProvider } from "../contexts/FirebaseAuthContext";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseAuthProvider>
  );
}

export default MyApp;
