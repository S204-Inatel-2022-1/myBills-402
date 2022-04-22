import { Flex, Image, Spinner } from "@chakra-ui/react";

export function LoadingSplash() {
  return (
    <Flex
      h="100vh"
      bg="#1B1B1F"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Image src="/mybills.png" w="400px" mb={10} alt="My Bills" />
      <Spinner size="lg" color="red.500" />
    </Flex>
  );
}
