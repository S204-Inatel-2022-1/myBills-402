import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { LoadingSplash } from "../components/LoadingSplash";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const Dashboard: NextPage = () => {
  const { user, isAuthLoading } = useFirebaseAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return <LoadingSplash />;
  }

  return (
    <Flex flexDir="column">
      <Header />
      <NewTransactionModal isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="flex-end" marginTop="10px" marginRight="100px">
      <Button onClick={onOpen} bg="#DC1637">Open Modal</Button>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
