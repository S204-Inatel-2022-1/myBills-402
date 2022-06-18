import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useFirebaseAuth } from "../../contexts/FirebaseAuthContext";
import { LoadingSplash } from "../LoadingSplash";
import { Sidebar } from "../Sidebar";

export function withSidebar(Component: NextPage) {
  return function Provider(pageProps: any) {
    const { isAuthLoading } = useFirebaseAuth();
    const isSidebarVisible = useBreakpointValue({
      md: true,
      sm: false,
    });

    if (isAuthLoading) {
      return <LoadingSplash />;
    }

    return (
      <Flex justify="end">
        {isSidebarVisible && <Sidebar />}
        <Flex
          flexDir="column"
          bg="white.200"
          w={isSidebarVisible ? "page" : "100vw"}
          minH="100vh"
          ml={isSidebarVisible ? "4rem" : "0"}
        >
          <Component {...pageProps} />
        </Flex>
      </Flex>
    );
  };
}
