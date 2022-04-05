import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text } from "@chakra-ui/react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export function Header() {
    return (
        <Flex
            as="nav"
            padding={5}
            w="100%"
            backgroundColor="#1B1B1F"
            color="white"
        >
            <Image src="/mybills.png" alt="MyBills" mb={5} />
            <Spacer />
            <UserInformation />
            <DropDownMenu />
        </Flex>
    );
}

function UserInformation() {
    const { user, handleLogout } = useFirebaseAuth();
    return(
        <Flex
                justifyContent="center"
                flexDir="column"
                display={["none", "none", "flex"]}
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
    );
}
function DropDownMenu() {
    const { user, handleLogout } = useFirebaseAuth();
    return(
    <Flex
                w="100%"
                padding={5}
                bg="#1B1B1F"
                color="white"
                display={["flex", "flex", "none"]}
            >
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        variant='outline'
                        _focus={ { bg: "#1B1B1F" } }
                    />
                    <MenuList
                        bg="#1B1B1F"
                    >
                        <MenuItem
                            color="white"
                            _focus={ { bg: "#1B1B1F" } }
                            icon={<CloseIcon />}
                            command='⌘S'
                            onClick={handleLogout}
                        >
                            Sair
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
    );
}
