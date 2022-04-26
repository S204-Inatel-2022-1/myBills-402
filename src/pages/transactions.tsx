import {
  Button,
  Container,
  Flex,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditTransactionModal } from "../components/EditTransactionModal";
import { Header } from "../components/Header";
import { LoadingSplash } from "../components/LoadingSplash";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

type Transaction = {
  id: string;
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};

const Dashboard: NextPage = () => {
  const { user, isAuthLoading } = useFirebaseAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction>({
  id: "70doJyvJPDpi8pgr8CZQ",
  name: "pepino",
  price: 12,
  isDeposit:false
  }as Transaction)
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
    <Flex flexDir="column" bg="white.200" minH="100vh">
      <Header />
      <NewTransactionModal isOpen={false} onClose={onClose}/>
      <EditTransactionModal isOpen={isOpen} onClose={onClose} transaction={transactionToEdit} />
      <Container marginTop="10px" maxW="2x1" px="8rem">
        <Flex justifyContent="space-between" mb="2rem">
          <Heading fontSize="36px" fontWeight="semibold" color="#414141">
            Transações
          </Heading>
          <Button onClick={onOpen} color="white" bg="red.500">
            Nova Transação
          </Button>
        </Flex>
        <TableContainer w="100%">
          <Table size="lg" w="100%" variant="customTable">
            <Thead>
              <Tr>
                <Th>Categoria</Th>
                <Th>Data</Th>
                <Th>Título</Th>
                <Th isNumeric>Valor</Th>
                <Th>Tipo</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Comida</Td>
                <Td>19/04/2022</Td>
                <Td>Pão de queijo</Td>
                <Td isNumeric>10,33</Td>
                <Td>Saída</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Flex>
  );
};

export default Dashboard;
