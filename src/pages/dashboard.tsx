import { Flex, Text } from "@chakra-ui/react";
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
import { useTransactions } from "../hooks/useTransactions";

const Dashboard: NextPage = () => {
  const { user, isAuthLoading } = useFirebaseAuth();
  const router = useRouter();
  const [totalDeposits, setTotalDeposits] = useState(0.0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0.0);
  const { transactions, isTransactionsLoading } = useTransactions();

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
    <Flex as="nav" flexDir="column" bg="white.200" minH="100vh">
      <Header />

      {!isTransactionsLoading && (
        <Flex>
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
      )}
    </Flex>
  );
};

export default withSidebar(Dashboard);
