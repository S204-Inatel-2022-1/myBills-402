import { Button, Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const Dashboard: NextPage = () => {
  const { user, isAuthLoading, handleLogout } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return (
      <Flex
        h="100vh"
        bg="#1B1B1F"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Image src="/mybills.png" w="400px" mb={10} alt="My Bills" />
        <Spinner size="lg" color="#DC1637" />
      </Flex>
    );
  }

  return (
    <Flex flexDir="column">
      <Flex>
        <Image src={user?.avatar} borderRadius="50%" h={16} />
        <Stack ml="1rem">
          <Text>Olá {user?.name}</Text>
          <Text>{user?.email}</Text>
          <Button onClick={handleLogout}>Sair</Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
