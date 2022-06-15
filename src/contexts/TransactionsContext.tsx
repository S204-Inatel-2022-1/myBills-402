import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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

type AvailableDate = {
  month: number;
  year: number;
};

type TransactionContextProps = {
  transactions: Transaction[];
  isTransactionsLoading: boolean;
  availableDates: AvailableDate[];
  selectedDate: AvailableDate | null;
  handleSelectDate: (p: string) => void;
  handleGetTransactions: () => void;
  handleGetTransactionsWithCategory: (category: string) => void;
};

type TransactionsProviderProps = {
  children: ReactNode;
};

const TransactionsContext = createContext<TransactionContextProps>(
  {} as TransactionContextProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<AvailableDate | null>(null);

  const { user } = useFirebaseAuth();

  async function handleGetTransactions() {
    if (user) {
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
  }

  async function handleGetTransactionsByMonth() {
    if (selectedDate === null) {
      handleGetTransactions();
      return;
    }

    const startDate = new Date(selectedDate.year, selectedDate.month, 1);
    const endDate = new Date(selectedDate.year, selectedDate.month + 1, 0);

    const q = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc"),
      where("authorId", "==", user?.id),
      where("createdAt", ">=", startDate),
      where("createdAt", "<=", endDate)
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

  function getTransactionMoths() {
    const dates = transactions.map((transaction) => {
      const date = transaction.createdAt.toDate();
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      return date;
    });

    const uniqueDates = [...new Set(dates.map((date) => date.toDateString()))]
      .map((date: string) => new Date(date))
      .map((date) => ({
        month: date.getMonth(),
        year: date.getFullYear(),
      }));

    if (uniqueDates.length >= availableDates.length)
      setAvailableDates(uniqueDates);
  }

  function handleSelectDate(date: string) {
    if (date === "all") {
      setSelectedDate(null);
      return;
    }

    const [month, year] = date.split("-");
    setSelectedDate({
      month: Number(month),
      year: Number(year),
    });
  }

  useEffect(() => {
    if (user) {
      setIsTransactionsLoading(true);
      if (selectedDate !== null) {
        handleGetTransactionsByMonth();
      } else {
        handleGetTransactions();
      }
      setIsTransactionsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    handleGetTransactionsByMonth();
  }, [selectedDate]);

  useEffect(() => {
    getTransactionMoths();
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isTransactionsLoading,
        availableDates,
        selectedDate,
        handleSelectDate,
        handleGetTransactions,
        handleGetTransactionsWithCategory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionsContext);
