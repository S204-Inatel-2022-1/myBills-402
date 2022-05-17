import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { withSidebar } from "../components/hocs/withSidebar";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const Dashboard: NextPage = () => {
  const { user, isAuthLoading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  return (
    <>
      <Head>
        <title>MyBills | Dashboard</title>
      </Head>
      <Flex as="nav" flexDir="column" bg="white.200" minH="100vh">
        <Header />
        <Text>Dashboard</Text>
      </Flex>
    </>
  );
};

export default withSidebar(Dashboard);
