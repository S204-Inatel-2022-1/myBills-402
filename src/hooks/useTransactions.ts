import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { db } from "../services/firebase";

type Transaction = {
  id: string;
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};

type useTransactionsReturns = {
  transactions: Transaction[];
  isTransactionsLoading: boolean;
  handleGetTransactions: () => void;
  handleGetTransactionsWithCategory: (category: string) => void;
};

export function useTransactions(): useTransactionsReturns {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const { user } = useFirebaseAuth();

  async function handleGetTransactions() {
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

  async function handleGetTransactionsWithCategory(category: string) {
    if (category === "all") {
      handleGetTransactions();
      return;
    }

    const q = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc"),
      where("authorId", "==", user?.id),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const transactionsList = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
    );
    setTransactions(transactionsList);
  }

  useEffect(() => {
    if (user) {
      setIsTransactionsLoading(true);
      handleGetTransactions();
      setIsTransactionsLoading(false);
    }
  }, [user]);

  return {
    transactions,
    isTransactionsLoading,
    handleGetTransactions,
    handleGetTransactionsWithCategory,
  };
}
