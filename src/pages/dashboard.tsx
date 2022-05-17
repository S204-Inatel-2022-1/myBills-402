import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { withSidebar } from "../components/hocs/withSidebar";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { SummaryBox } from "../components/SummaryBox";
import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { CgArrowsExchangeV } from "react-icons/cg";

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
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalDeposits, setTotalDeposits] = useState(0.0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0.0);
  const [totalExpenses, setTotalExpenses] = useState(0.0);

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

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    const deposits = transactions.reduce((acc, transaction) => {
      if (transaction.isDeposit) {
        return acc + transaction.price;
      }
      return acc;
    }, 0);
    setTotalDeposits(deposits);
  }, [transactions]);

  useEffect(() => {
    const withdrawals = transactions.reduce((acc, transaction) => {
      if (!transaction.isDeposit) {
        return acc + transaction.price;
      }
      return acc;
    }, 0);
    setTotalWithdrawals(withdrawals);
  }, [transactions]);

  useEffect(() => {
    const expenses = transactions.reduce((acc, transaction) => {
      if (transaction.isDeposit) {
        return acc + transaction.price;
      } else {
        return acc - transaction.price;
      }
    }, 0);
    setTotalExpenses(expenses);
  }, [transactions]);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/");
    }
  }, [user, isAuthLoading]);

  return (
    <Flex as="nav" flexDir="column" bg="white.200" minH="100vh">
      <Header />
      <Flex>
        <SummaryBox title="Depósitos" value={totalDeposits} bgColor="#FFF" textColor="#41414D" icon={IoIosArrowDropup} iconColor="green.500" />
        <SummaryBox title="Retiradas" value={totalWithdrawals} bgColor="#FFF" textColor="#41414D" icon={IoIosArrowDropdown} iconColor="red.500" />
        <SummaryBox title="Total" value={totalExpenses} bgColor={totalExpenses >= 0 ? "green.500" : "red.500"} textColor="white" icon={CgArrowsExchangeV} iconColor="white" />
      </Flex>
    </Flex>
  );
};

export default withSidebar(Dashboard);
