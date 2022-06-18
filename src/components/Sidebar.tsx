import { Box, Flex, Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BsArrowLeftRight } from "react-icons/bs";
import { useRouter } from "next/router";

const links = [
  { href: "/dashboard", icon: MdDashboard, label: "Dashboard" },
  { href: "/transactions", icon: BsArrowLeftRight, label: "Transações" },
];

export function Sidebar() {
  const { asPath } = useRouter();
  return (
    <Flex
      flexDir="column"
      h="100vh"
      width="sidebar"
      bg="gray.900"
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      boxShadow="lg"
      zIndex="2"
    >
      <Box bg="red.500" p="1rem">
        <Image src="/mybillslogo.svg" alt="my bills" />
      </Box>
      <Flex
        flexDir="column"
        h="100%"
        width="sidebar"
        align="center"
        justify="center"
      >
        {links.map((link) => (
          <Flex
            key={link.href}
            mb="1rem"
            width="100%"
            align="center"
            justify="center"
            height="3rem"
            borderLeft={asPath === link.href ? "2px solid red" : ""}
          >
            <Link href={link.href} passHref>
              <a>
                <Tooltip cursor="pointer" label={link.label}>
                  <Text>
                    <Icon
                      as={link.icon}
                      fontSize="32"
                      color={asPath === link.href ? "white.200" : "gray.300"}
                      cursor="pointer"
                    />
                  </Text>
                </Tooltip>
              </a>
            </Link>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
