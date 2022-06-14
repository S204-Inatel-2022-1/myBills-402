import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { useTransactions } from "../contexts/TransactionsContext";
//import dynamic from "next/dynamic";

//const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartData = {
    date: string;
    value: number;
}

export function MonthChart() {
    const { transactions } = useTransactions();
    const [data, setData] = useState<ChartData[]>([]);
    function generateData() {
        const transactionsByDate = transactions.reduce((acc, transaction) => {
            const date = transaction.createdAt.toDate();
            date.setHours(0, 0, 0, 0);
            const dateString = date.toLocaleDateString();
            acc[dateString] = acc[dateString] ?? 0;
            acc[dateString] = acc[dateString] + transaction.price;
            return acc;
          }, Object.create(null));
          const values = Object.values(transactionsByDate).reverse();
          const labels: string[] = Object.keys(transactionsByDate).reverse();
          const temp = values.map((value, index) => ({
            date: labels[index],
            value: Number(value)
          }));
          setData(temp);
    }
    useEffect(() => {
        generateData();
    }, [transactions]);
    
    return (
        <Flex shadow="xl" bg="white" p="16px" borderRadius="8px" width="93.5vw" alignItems="center" justifyContent="center">
            <LineChart width={1700} height={500} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#dc1637"/>
            </LineChart>
        </Flex>
    );
}