import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useFirebaseAuth } from "../../contexts/FirebaseAuthContext";
import { LoadingSplash } from "../LoadingSplash";
import { Sidebar } from "../Sidebar";

export function withSidebar(Component: NextPage) {
  return function Provider(pageProps: any) {
    const { isAuthLoading } = useFirebaseAuth();

    if (isAuthLoading) {
      return <LoadingSplash />;
    }

    return (
      <Flex justify="end">
        <Sidebar />
        <Flex
          flexDir="column"
          bg="white.200"
          w="page"
          minH="100vh"
          ml="sidebar"
        >
          <Component {...pageProps} />
        </Flex>
      </Flex>
    );
  };
}
