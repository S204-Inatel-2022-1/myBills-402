import {
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { withSidebar } from "../components/hocs/withSidebar";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { SummaryBox } from "../components/SummaryBox";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { CgArrowsExchangeV } from "react-icons/cg";
import { useTransactions } from "../contexts/TransactionsContext";
import { CategoryChart } from "../components/CategoryChart";
import { MonthChart } from "../components/MonthChart";
import Link from "next/link";
import { MobileMenu } from "../components/MobileMenu";

const Dashboard: NextPage = () => {
  const { user, isAuthLoading } = useFirebaseAuth();
  const router = useRouter();
  const [totalDeposits, setTotalDeposits] = useState(0.0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0.0);
  const { transactions, isTransactionsLoading } = useTransactions();
  const {
    isOpen: isMobileMenuOpen,
    onOpen: handleOpenMobileMenu,
    onClose: handleCloseMobileMenu,
  } = useDisclosure();

  useEffect(() => {
    setTotalWithdrawals(
      transactions.reduce((acc, transaction) => {
        if (!transaction.isDeposit) {
          return acc + transaction.price;
        }
        return acc;
      }, 0)
    );
    setTotalDeposits(
      transactions.reduce((acc, transaction) => {
        if (transaction.isDeposit) {
          return acc + transaction.price;
        }
        return acc;
      }, 0)
    );
  }, [transactions]);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  return (
    <Flex flexDir="column" bg="white.200" minH="100vh">
      <Head>
        <title>MyBills | Dashboard</title>
      </Head>
      <Header openMobileMenu={handleOpenMobileMenu} />
      <MobileMenu onClose={handleCloseMobileMenu} isOpen={isMobileMenuOpen} />
      {!isTransactionsLoading && (
        <Flex
          justify={["center", "center", "space-between"]}
          align={["center", "center", "space-between"]}
          px="2rem"
          mb="1rem"
          flexDir={{
            base: "column",
            sm: "column",
            md: "row",
          }}
        >
          <Flex
            w="100%"
            gap={{ base: "1rem", sm: "1rem", md: "2rem" }}
            mt={{ base: "-10px", sm: "-10px", md: "-20px" }}
            zIndex="2"
            flexDir={{
              base: "column",
              sm: "column",
              md: "row",
            }}
          >
            <SummaryBox
              title="Depósitos"
              value={totalDeposits}
              bgColor="#FFF"
              textColor="#41414D"
              icon={IoIosArrowDropup}
              iconColor="green.500"
            />
            <SummaryBox
              title="Retiradas"
              value={totalWithdrawals}
              bgColor="#FFF"
              textColor="#41414D"
              icon={IoIosArrowDropdown}
              iconColor="red.500"
            />
            <SummaryBox
              title="Total"
              value={totalDeposits - totalWithdrawals}
              bgColor={
                totalDeposits - totalWithdrawals >= 0 ? "green.500" : "red.500"
              }
              textColor="white"
              icon={CgArrowsExchangeV}
              iconColor="white"
            />
          </Flex>
          <Link href="/transactions" passHref>
            <Button
              as="a"
              mt="1rem"
              bg="red.500"
              color="white"
              _hover={{
                opacity: 0.7,
              }}
            >
              Editar transações
            </Button>
          </Link>
        </Flex>
      )}
      <SimpleGrid
        columns={[1, 1, 2]}
        gridRowGap="1rem"
        gridColumnGap={{ base: 0, sm: 0, md: "1rem" }}
        px="2rem"
        py="1rem"
      >
        <CategoryChart isDeposit={true} />
        <CategoryChart isDeposit={false} />
        <GridItem colSpan={2} rowStart={[3, 3, 2]}>
          <MonthChart />
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
};

export default withSidebar(Dashboard);
