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
  Td,
  TableContainer,
  Heading,
  Stack,
  IconButton,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { hex2rgba } from "../utils/hex2rgba";
import { EditTransactionModal } from "../components/EditTransactionModal";
import { Header } from "../components/Header";
import { LoadingSplash } from "../components/LoadingSplash";
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

  if (isAuthLoading) {
    return <LoadingSplash />;
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
    <Flex flexDir="column" bg="white.200" minH="100vh">
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
                  <Tr key={transaction.id} boxShadow="md" bgColor="white">
                    <Td>
                      <Flex align="center">
                      <CategoryIcon category={transaction.category}/>
                      <Text ml="0.5rem" >
                        {getCategory(transaction.category)}
                      </Text>
                      </Flex>
                    </Td>
                    <Td color="gray.300">
                      {transaction.createdAt.toDate().toLocaleDateString()}
                    </Td>
                    <Td>{transaction.name}</Td>
                    <Td isNumeric>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(transaction.price)}
                    </Td>
                    <Td py="0">
                      {transaction.isDeposit ? (
                        <Tag
                          size="lg"
                          variant="subtle"
                          borderWidth="1px"
                          borderColor="green.500"
                          bg={hex2rgba("03B252", 0.1)}
                          color="green.500"
                        >
                          <TagLeftIcon boxSize="1rem" as={BsArrowUpCircle} />
                          <TagLabel>Depósito</TagLabel>
                        </Tag>
                      ) : (
                        <Tag
                          size="lg"
                          variant="subtle"
                          borderWidth="1px"
                          borderColor="red.500"
                          bg={hex2rgba("DC1637", 0.1)}
                          color="red.500"
                        >
                          <TagLeftIcon boxSize="12px" as={BsArrowDownCircle} />
                          <TagLabel>Retirada</TagLabel>
                        </Tag>
                      )}
                    </Td>
                    <Td px="1rem">
                      <IconButton
                        onClick={() => setTransactionToEdit(transaction)}
                        borderRadius="50%"
                        color="red.500"
                        fontSize="1.2rem"
                        bg="transparent"
                        aria-label="edit transaction"
                        icon={<BiEditAlt />}
                      />
                    </Td>
                  </Tr>
                ))}
              </>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Flex>
  );
};

export default Dashboard;
