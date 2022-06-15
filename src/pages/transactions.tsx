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
  IconButton,
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Portal,
  Icon,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditTransactionModal } from "../components/EditTransactionModal";
import { Header } from "../components/Header";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Timestamp } from "firebase/firestore";
import { withSidebar } from "../components/hocs/withSidebar";
import { TransactionItem } from "../components/TransactionItem";
import { BsFilter } from "react-icons/bs";
import Head from "next/head";
import { categories } from "../utils/categories";
import { CategoryIcon } from "../components/CategoryIcon";
import { useTransactions } from "../contexts/TransactionsContext";
import { MobileMenu } from "../components/MobileMenu";

type Transaction = {
  id: string;
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};

const PopoverTrigger: React.FC<{
  children: React.ReactNode;
}> = OrigPopoverTrigger;

export const TransactionsPage: NextPage = () => {
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
  const {
    isOpen: isMobileMenuOpen,
    onOpen: handleOpenMobileMenu,
    onClose: handleCloseMobileMenu,
  } = useDisclosure();

  const [
    transactionToEdit,
    setTransactionToEdit,
  ] = useState<Transaction | null>(null);
  const router = useRouter();
  const [transactionFilter, setTransactionFilter] = useState("all");
  const {
    transactions,
    isTransactionsLoading,
    handleGetTransactions,
    handleGetTransactionsWithCategory,
  } = useTransactions();

  function handleClosingWithReloading() {
    handleCloseNewTransactionModal();
    handleGetTransactions();
  }

  function handleClosingWithTransactionClean() {
    handleCloseEditTransactionModal();
    setTransactionToEdit(null);
    handleGetTransactions();
  }

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    if (transactionToEdit) handleOpenEditTransactionModal();
  }, [transactionToEdit]);

  useEffect(() => {
    handleGetTransactionsWithCategory(transactionFilter);
  }, [transactionFilter]);

  return (
    <>
      <Head>
        <title>MyBills | Transactions</title>
      </Head>
      <Header openMobileMenu={handleOpenMobileMenu} />
      <MobileMenu onClose={handleCloseMobileMenu} isOpen={isMobileMenuOpen} />
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
                  <Th>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          aria-label="filter"
                          size="sm"
                          rounded="full"
                          p={1}
                          bg="green.500"
                          color="white"
                          shadow="md"
                          d="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={BsFilter} />
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent bg="white">
                          <PopoverArrow />
                          <PopoverHeader>Filtro por categoria</PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <RadioGroup
                              value={transactionFilter}
                              onChange={setTransactionFilter}
                            >
                              <Stack>
                                <Radio value="all" colorScheme="red">
                                  Todos
                                </Radio>
                                {categories.map((category) => (
                                  <Radio
                                    key={category.id}
                                    value={category.value}
                                    colorScheme="red"
                                  >
                                    <Flex align="center">
                                      <CategoryIcon
                                        category={category.value}
                                        fontSize="16px"
                                        color="black"
                                      />
                                      <Text ml="0.5rem">{category.label}</Text>
                                    </Flex>
                                  </Radio>
                                ))}
                              </Stack>
                            </RadioGroup>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </Th>
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

export default withSidebar(TransactionsPage);
