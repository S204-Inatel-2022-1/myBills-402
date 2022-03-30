import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const Dashboard: NextPage = () => {
    const { user, handleLogout } = useFirebaseAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user]);

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
}

export default Dashboard;