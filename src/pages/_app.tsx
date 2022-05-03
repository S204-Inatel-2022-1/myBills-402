import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { FirebaseAuthProvider } from "../contexts/FirebaseAuthContext";
import "../styles/main.css";
import { theme } from "../themes/theme";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </ChakraProvider>
    </FirebaseAuthProvider>
  );
}

export default MyApp;
