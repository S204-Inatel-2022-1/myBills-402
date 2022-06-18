import { useEffect, useState } from "react";
import { useTransactions } from "../contexts/TransactionsContext";
import { getCategory } from "../utils/categories";
import { Flex, GridItem, Text } from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type CategoryChartProps = {
  isDeposit: boolean;
};

type ChartData = {
  label: string;
  value: number;
  percent: number;
};

export function CategoryChart({ isDeposit }: CategoryChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { transactions, isTransactionsLoading } = useTransactions();

  const COLORS = isDeposit
    ? ["#03B252", "#DC1637", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
    : ["#DC1637", "#03B252", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  function getTotalExpanse() {
    if (transactions.length === 0) {
      return 0;
    }

    const res = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = acc[transaction.category] ?? 0;
      if (isDeposit) {
        if (transaction.isDeposit) {
          acc[transaction.category] =
            acc[transaction.category] + transaction.price;
        }
      } else {
        if (!transaction.isDeposit) {
          acc[transaction.category] =
            acc[transaction.category] + transaction.price;
        }
      }

      return acc;
    }, Object.create(null));
    const labels = Object.keys(res).map((key) => getCategory(key));
    const values: number[] = Object.values(res);
    const data: ChartData[] = labels.map((label, i) => ({
      label,
      value: values[i],
      percent: (values[i] / values.reduce((acc, i) => acc + i)) * 100,
    }));

    setChartData(data.filter((item) => item.value > 0));
  }

  useEffect(() => {
    getTotalExpanse();
  }, [transactions]);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <GridItem
      display="flex"
      colSpan={1}
      rowStart={isDeposit ? 1 : [2, 2, 1]}
      shadow="xl"
      bg="white"
      borderRadius="8px"
      width="100%"
      height="300px"
      flexDir="column"
      p="1rem"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontWeight="semibold" color="#414141">
        {isDeposit ? "Depósitos" : "Retiradas"}
      </Text>
      <ResponsiveContainer width="99%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={90}
            labelLine={false}
            dataKey="value"
          >
            <Tooltip />
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ whiteSpace: "break-spaces" }}
            payload={chartData
              .sort((a, b) => b.percent - a.percent)
              .map((item, index) => ({
                id: item.label,
                type: "square",
                value: `${item.label} (${item.percent.toFixed(0)}%)`,
                color: COLORS[index % COLORS.length],
              }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </GridItem>
  );
}
