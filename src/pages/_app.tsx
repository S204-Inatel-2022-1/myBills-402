import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { FirebaseAuthProvider } from "../contexts/FirebaseAuthContext";
import "../styles/main.css";
import { theme } from "../themes/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseAuthProvider>
  );
}

export default MyApp;
