import { useEffect, useState } from "react";
import { useTransactions } from "../contexts/TransactionsContext";
import { getCategory } from "../utils/categories";
import dynamic from "next/dynamic";
import { Box, Flex } from "@chakra-ui/react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type CategoryChartProps = {
  isDeposit: boolean;
};

export function CategoryChart({ isDeposit }: CategoryChartProps) {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState<string[]>([]);
  const { transactions, isTransactionsLoading } = useTransactions();

  function getTotalExpanse() {

    if (isTransactionsLoading) {
      return 0;
    }

    const res = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = acc[transaction.category] ?? 0;
      if (isDeposit) {
        if (transaction.isDeposit) {
          acc[transaction.category] = acc[transaction.category] + transaction.price;
        }
      } else {
        if (!transaction.isDeposit) {
          acc[transaction.category] = acc[transaction.category] + transaction.price;
        }
      }

      return acc;
    }, Object.create(null));
    const labels = Object.keys(res).map(key =>
      getCategory(key)
    );
    setLabels(labels);
    setSeries(Object.values(res));

  }

  useEffect(() => { getTotalExpanse() }, [isTransactionsLoading]);
  return (
    <Flex shadow="xl" bg="white" p="16px" borderRadius="8px" width="46.3vw" alignItems="center" justifyContent="center">
    {(typeof window !== "undefined") && (
      <Chart
        options={{
          legend: {
            position: "bottom",
            fontSize: "16px",
          },
          theme: {
            palette: "palette8",
          },
          chart: {
            toolbar: {
              show: true,
            },
          },
          labels, title: {
            text: isDeposit ? "Depósitos" : "Despesas",
            align: "center",
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Poppins",
            },
          }

        }}
        series={series}
        type="donut"
        width="650px"
      />
    )}
    </Flex>
  );
}