import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
      <Button onClick={onOpen}>Open Modal</Button>
      <NewTransactionModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Dashboard;
