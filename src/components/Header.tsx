import { Button, Flex, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export function Header() {
    const { user, handleLogout } = useFirebaseAuth();

    return (
        <Flex
            as="nav"
            padding={5}
            backgroundColor="#1B1B1F"
            color="white"
        >
            <Image src="/mybills.png" alt="MyBills" mb={5} />
            <Spacer />
            <Flex
                justifyContent="center"
                flexDir="column"
            >
                <Flex
                    marginBottom={3}
                >
                    <Image src={user?.avatar} borderRadius="50%" h={16} />
                    <Stack ml="1rem">
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                        >Olá, {user?.name}</Text>
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                        >{user?.email}</Text>
                    </Stack>
                </Flex>
                <Button
                    onClick={handleLogout}
                    colorScheme="red"
                    fontWeight="bold"
                    fontSize="lg"
                >Sair</Button>

            </Flex>

        </Flex>

    );
}