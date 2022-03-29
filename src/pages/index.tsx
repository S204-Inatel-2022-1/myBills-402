import type { NextPage } from "next";
import {
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AiOutlineGoogle } from "react-icons/ai";
import { auth } from "../services/firebase";

const Home: NextPage = () => {
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    const user = await signInWithPopup(auth, provider);

    console.log(user);
  };

  return (
    <SimpleGrid columns={2} h="100vh" bg="#1B1B1F">
      <Flex bgImage="/myBillsBg.svg" bgSize="95%" bgRepeat="no-repeat"></Flex>
      <Flex
        alignItems="flex-start"
        p={[5, 5, 20]}
        justifyContent="center"
        flexDir="column"
      >
        <Image src="/mybills.png" alt="MyBills" mb={10} />
        <Stack gap={2}>
          <Text fontWeight="bold" fontSize="1.5rem" color="white">
            Bem-vindo
          </Text>
          <Text color="white">Faça login com o Google para começar!</Text>
          <Button
            bg="#DC1637"
            color="white"
            _hover={{
              filter: "brightness(0.8)",
              transition: "0.5s",
            }}
            onClick={handleLogin}
            size="lg"
            leftIcon={<Icon as={AiOutlineGoogle} />}
          >
            <Text>Crie sua conta com o Google</Text>
          </Button>
        </Stack>
      </Flex>
    </SimpleGrid>
  );
};

export default Home;
