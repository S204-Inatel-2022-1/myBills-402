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
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { LoadingSplash } from "../components/LoadingSplash";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { collection, query, where, getDocs, Timestamp, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

type Transaction = {
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
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    if (user) {
      getTransactions();
    }
  }, [user]);
  
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  function handleClosingWithReloading() {
    onClose();
    getTransactions();
  }

  if (isAuthLoading) {
    return <LoadingSplash />;
  }


  async function getTransactions() {
    const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"), where("authorId", "==", user?.id));
    const querySnapshot = await getDocs(q);
    const transactionsList = querySnapshot.docs.map(doc => doc.data() as Transaction);
    setTransactions(transactionsList);
  }



  return (
    <Flex flexDir="column" bg="white.200" minH="100vh">
      <Header />
      <NewTransactionModal isOpen={isOpen} onClose={handleClosingWithReloading} />
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
            <Tbody gap="0.5rem">
                {transactions.length > 0 && (
                  <>
              {transactions?.map((transaction) => (
                <Tr key={transaction.name} bgColor="white" borderRadius="10" mb="0.5rem">
                  <Td>{transaction.category}</Td>
                  <Td>{transaction.createdAt.toDate().toLocaleDateString()}</Td>
                  <Td>{transaction.name}</Td>
                  <Td isNumeric>{transaction.price}</Td>
                  <Td>{transaction.isDeposit ? "Depósito" : "Saída"}</Td>
                </Tr>
              ))}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Flex>
  );
};

export default Dashboard;
