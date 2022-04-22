import type { NextPage } from "next";
import {
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Icon,
  Spinner,
} from "@chakra-ui/react";

import { AiOutlineGoogle } from "react-icons/ai";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoadingSplash } from "../components/LoadingSplash";

const Home: NextPage = () => {
  const { handleLogin, user, isAuthLoading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return <LoadingSplash />;
  }

  return (
    <SimpleGrid columns={[1, 1, 2]} h="100vh" bg="#1B1B1F">
      <Flex
        display={["none", "none", "flex"]}
        bgImage="/myBillsBg.svg"
        bgSize="95%"
        bgRepeat="no-repeat"
      ></Flex>
      <Flex
        alignItems={["center", "center", "flex-start"]}
        p={[5, 5, 20]}
        justifyContent="center"
        flexDir="column"
      >
        <Image src="/mybills.png" alt="MyBills" mb={10} />
        <Stack gap={2} alignItems={["center", "center", "flex-start"]}>
          <Text fontWeight="bold" fontSize="1.5rem" color="white">
            Bem-vindo
          </Text>
          <Text color="white">Faça login com o Google para começar!</Text>
          <Button
            bg="red.500"
            color="white"
            _hover={{
              filter: "brightness(0.8)",
              transition: "0.5s",
            }}
            onClick={handleLogin}
            size="lg"
            leftIcon={<Icon as={AiOutlineGoogle} />}
          >
            <Text>Entre com a sua conta do Google</Text>
          </Button>
        </Stack>
      </Flex>
    </SimpleGrid>
  );
};

export default Home;
