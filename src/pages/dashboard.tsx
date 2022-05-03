import { Button, Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { LoadingSplash } from "../components/LoadingSplash";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const Dashboard: NextPage = () => {
  const { user, isAuthLoading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return <LoadingSplash />;
  }

  return (
    <Flex as="nav" flexDir="column" bg="white.200" minH="100vh">
      <Header />
      <Text>Dashboard</Text>
    </Flex>
  );
};

export default Dashboard;
