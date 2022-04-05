import { Button, Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingSplash } from "../components/LoadingSplash";
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
    return <LoadingSplash />;
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
