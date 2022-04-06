import { CloseIcon, HamburgerIcon, Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export function Header() {
  const { user, handleLogout } = useFirebaseAuth();

  return (
    <Flex as="nav" padding={5} w="100%" backgroundColor="#1B1B1F" color="white">
      <Image
        src="/mybillsV2.svg"
        w={["200px", "250px", "350px"]}
        alt="MyBills"
        mb={5}
      />
      <Spacer />
      <Popover>
        <PopoverTrigger>
          <Avatar name={user?.name} cursor="pointer" src={user?.avatar} />
        </PopoverTrigger>
        <PopoverContent
          mr="16px"
          borderRadius="10px"
          _focus={{
            outline: "none",
          }}
        >
          <PopoverBody d="flex" flexDir="row" py="1rem">
            <Avatar name={user?.name} src={user?.avatar} />
            <Stack ml="1rem" justifyContent="center">
              <Text fontSize="lg" fontWeight="bold" color="#1B1B1F">
                Olá, {user?.name}
              </Text>
              <Text fontSize="lg" color="#1B1B1F">
                {user?.email}
              </Text>
            </Stack>
          </PopoverBody>
          <PopoverFooter
            cursor="pointer"
            borderBottomRadius="10px"
            bg="#DC1637"
            onClick={handleLogout}
            d="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            gap="1rem"
          >
            Sair
            <Icon as={MdLogout} />
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
