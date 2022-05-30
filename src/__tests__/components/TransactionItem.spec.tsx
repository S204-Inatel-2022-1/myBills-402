import { Table, Tbody } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import { TransactionItem } from "../../components/TransactionItem";

type Transaction = {
  id: string;
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};

export const renderWithTable = (component: JSX.Element) => {
  return render(
    <Table>
      <Tbody>{component}</Tbody>
    </Table>
  );
};

describe("Transaction Item", () => {
  const transaction: Transaction = {
    id: "test-id",
    name: "test-name",
    category: "food",
    isDeposit: true,
    authorId: "test-author-id",
    price: 10,
    createdAt: Timestamp.now(),
  };
  const onSelectTransactionMock = jest.fn();
  it("should render correctly", () => {
    renderWithTable(
      <TransactionItem
        transaction={transaction}
        onSelectTransaction={onSelectTransactionMock}
      />
    );

    expect(screen.getByText("test-name")).toBeInTheDocument();
  });

  it("should render tab correctly when is deposit", () => {
    renderWithTable(
      <TransactionItem
        transaction={transaction}
        onSelectTransaction={onSelectTransactionMock}
      />
    );

    expect(screen.getByText("Depósito")).toBeInTheDocument();
  });

  it("should render tab correctly when is not deposit", () => {
    renderWithTable(
      <TransactionItem
        transaction={{ ...transaction, isDeposit: false }}
        onSelectTransaction={onSelectTransactionMock}
      />
    );

    expect(screen.getByText("Retirada")).toBeInTheDocument();
  });

  it("should be able to select transaction", () => {
    renderWithTable(
      <TransactionItem
        transaction={transaction}
        onSelectTransaction={onSelectTransactionMock}
      />
    );

    const editTransactionButton = screen.getByLabelText("edit transaction");
    fireEvent.click(editTransactionButton);
    expect(onSelectTransactionMock).toHaveBeenCalled();
  });
});
