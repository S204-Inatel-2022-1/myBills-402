import {
  Button,
  Container,
  Flex,
  useDisclosure,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditTransactionModal } from "../components/EditTransactionModal";
import { Header } from "../components/Header";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { withSidebar } from "../components/hocs/withSidebar";
import { TransactionItem } from "../components/TransactionItem";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { getCategory } from "../utils/categories";
import { CategoryIcon } from "../components/CategoryIcon";

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
  const {
    isOpen: isNewTransactionModalOpen,
    onOpen: handleOpenNewTransactionModal,
    onClose: handleCloseNewTransactionModal,
  } = useDisclosure();
  const {
    isOpen: isEditTransactionModalOpen,
    onOpen: handleOpenEditTransactionModal,
    onClose: handleCloseEditTransactionModal,
  } = useDisclosure();
  const [
    transactionToEdit,
    setTransactionToEdit,
  ] = useState<Transaction | null>(null);
  const router = useRouter();
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      setIsTransactionsLoading(true);
      getTransactions();
      setIsTransactionsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    if (transactionToEdit) handleOpenEditTransactionModal();
  }, [transactionToEdit]);

  function handleClosingWithReloading() {
    handleCloseNewTransactionModal();
    getTransactions();
  }

  function handleClosingWithTransactionClean() {
    handleCloseEditTransactionModal();
    setTransactionToEdit(null);
    getTransactions();
  }

  async function getTransactions() {
    const q = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc"),
      where("authorId", "==", user?.id)
    );
    const querySnapshot = await getDocs(q);
    const transactionsList = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
    );
    setTransactions(transactionsList);
  }

  return (
    <>
      <Header />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onClose={handleClosingWithReloading}
      />
      {transactionToEdit && (
        <EditTransactionModal
          isOpen={isEditTransactionModalOpen}
          onClose={handleClosingWithTransactionClean}
          transaction={transactionToEdit}
        />
      )}
      <Container marginTop="10px" maxW="2x1" px={["1rem", "1rem", "8rem"]}>
        <Flex justifyContent="space-between" mb="2rem">
          <Heading fontSize="36px" fontWeight="semibold" color="#414141">
            Transações
          </Heading>
          <Button
            onClick={handleOpenNewTransactionModal}
            color="white"
            bg="red.500"
          >
            Nova Transação
          </Button>
        </Flex>
        {isTransactionsLoading ? (
          <Spinner
            position="absolute"
            top="50%"
            left="50%"
            size="lg"
            color="red.500"
          />
        ) : (
          <TableContainer w="100%">
            <Table
              size="lg"
              w="100%"
              h="100%"
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0 0.5rem",
              }}
              variant="customTable"
            >
              <Thead>
                <Tr>
                  <Th>Categoria</Th>
                  <Th>Data</Th>
                  <Th>Título</Th>
                  <Th isNumeric>Valor</Th>
                  <Th>Tipo</Th>
                </Tr>
              </Thead>
              <Tbody gap="1rem">
                <>
                  {transactions?.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      onSelectTransaction={setTransactionToEdit}
                    />
                  ))}
                </>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default withSidebar(Dashboard);
