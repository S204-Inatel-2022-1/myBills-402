import { Flex, keyframes, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useTransactions } from "../contexts/TransactionsContext";

type ChartData = {
  date: string;
  value: string;
};

export function MonthChart() {
  const { transactions } = useTransactions();
  const [data, setData] = useState<ChartData[]>([]);
  function generateData() {
    const transactionsByDate = transactions.reduce((acc, transaction) => {
      const date = transaction.createdAt.toDate();
      date.setHours(0, 0, 0, 0);
      const dateString = date.toLocaleDateString();
      acc[dateString] = acc[dateString] ?? 0;
      if (transaction.isDeposit) {
        acc[dateString] = acc[dateString] + transaction.price;
      } else {
        acc[dateString] = acc[dateString] - transaction.price;
      }

      return acc;
    }, Object.create(null));
    const values = Object.values(transactionsByDate).reverse();
    const labels: string[] = Object.keys(transactionsByDate).reverse();
    const temp = values.map((value, index) => ({
      date: labels[index],
      value: Number(value).toFixed(2),
    }));
    setData(temp);
  }
  useEffect(() => {
    generateData();
  }, [transactions]);

  return (
    <Flex
      shadow="xl"
      bg="white"
      p="1rem"
      borderRadius="8px"
      alignItems="center"
      height="400px"
      justifyContent="center"
      flexDir="column"
    >
      <Text fontWeight="semibold" color="#414141" mb="2rem">
        Depósitos/Retiradas por dia
      </Text>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" axisLine={false} dy={5} />
          <ReferenceLine y={0} stroke="#000000" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Depósito/Retirada"
            stroke="#03B252"
          />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
}
