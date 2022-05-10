import { Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger as OrigPopoverTrigger,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const PopoverTrigger: React.FC<{
  children: React.ReactNode;
}> = OrigPopoverTrigger;

export function Header() {
  const { user, handleLogout } = useFirebaseAuth();

  return (
    <Flex as="nav" padding={5} w="100%" bg="gray.900" color="white" shadow="md">
      <Image
        src="/mybills.svg"
        w={["150px", "250px", "250px"]}
        alt="MyBills"
        mb={5}
        ml="1rem"
      />
      <Spacer />
      <Popover>
        <PopoverTrigger>
          <Avatar name={user?.name} cursor="pointer" src={user?.avatar} />
        </PopoverTrigger>
        <PopoverContent
          mr="16px"
          bg="white"
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
            bg="red.500"
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
