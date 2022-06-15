import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const links = [
  { href: "/dashboard", icon: MdDashboard, label: "Dashboard" },
  { href: "/transactions", icon: BsArrowLeftRight, label: "Transações" },
];

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, handleLogout } = useFirebaseAuth();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay onClick={onClose} />
      <DrawerContent>
        <DrawerCloseButton color="white" />
        {user && (
          <DrawerHeader bg="red.500">
            <Flex h="80px" />
            <Flex>
              <Avatar src={user?.avatar} name={user?.name} />
              <Stack ml="1rem" justifyContent="center" gap="0">
                <Text fontSize="lg" fontWeight="thin" color="white">
                  Olá, {user?.name}
                </Text>
                <Text fontSize="sm" fontWeight="thin" color="white" m="0">
                  {user?.email}
                </Text>
              </Stack>
            </Flex>
          </DrawerHeader>
        )}
        <DrawerBody display="flex" flexDirection="column">
          {links.map((item) => (
            <Link key={item.label} href={item.href}>
              <a href="" onClick={onClose}>
                <Flex
                  align="center"
                  gap="0.5rem"
                  p="0.5rem"
                  _hover={{
                    background: "gray.100",
                  }}
                  color="gray.700"
                >
                  <Icon as={item.icon} />
                  <Text>{item.label}</Text>
                </Flex>
              </a>
            </Link>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={handleLogout}
            bg="red.500"
            color="white"
            rightIcon={<Icon as={MdLogout} />}
          >
            Sair
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
