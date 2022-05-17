import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { deleteDoc, Timestamp, updateDoc } from "firebase/firestore";
import { mocked } from "jest-mock";
import { ToastContainer } from "react-toastify";
import { EditTransactionModal } from "../../components/EditTransactionModal";

type Transaction = {
  id: string;
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};

const transaction: Transaction = {
  id: "test-id",
  name: "test-name",
  category: "food",
  isDeposit: true,
  authorId: "test-author-id",
  price: 100,
  createdAt: Timestamp.now(),
};

export const renderWithToastify = (component: JSX.Element) => {
  return render(
    <>
      <ToastContainer autoClose={3000} />
      {component}
    </>
  );
};

jest.mock("firebase/firestore");

describe("EditTransactionModal", () => {
  it("should render correctly", () => {
    render(
      <EditTransactionModal
        isOpen={true}
        onClose={jest.fn()}
        transaction={transaction}
      />
    );

    const nameInput = screen.getByPlaceholderText("Nome");
    const categorySelect = screen.getByTestId("select");

    expect(nameInput).toHaveValue(transaction.name);
    expect(categorySelect).toHaveValue(transaction.category);
    expect(screen.getByText("Editar Transação")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Deletar")).toBeInTheDocument();
  });

  it("should not render if closed", () => {
    render(
      <EditTransactionModal
        isOpen={false}
        onClose={jest.fn()}
        transaction={transaction}
      />
    );

    expect(screen.queryByText("Editar Transação")).not.toBeInTheDocument();
    expect(screen.queryByText("Salvar")).not.toBeInTheDocument();
    expect(screen.queryByText("Deletar")).not.toBeInTheDocument();
  });

  it("should be able to edit transaction", async () => {
    const onCloseMocked = jest.fn();
    renderWithToastify(
      <EditTransactionModal
        isOpen={true}
        onClose={onCloseMocked}
        transaction={transaction}
      />
    );

    const nameInput = screen.getByPlaceholderText("Nome");
    const isDepositInput = screen.getByText("Entrada");
    const isNotDepositInput = screen.getByText("Saída");
    const valueInput = screen.getByPlaceholderText("Preço");
    const categorySelect = screen.getByTestId("select");
    const saveButton = screen.getByText("Salvar");

    fireEvent.change(nameInput, { target: { value: "new-name" } });
    fireEvent.change(valueInput, { target: { value: 123 } });
    fireEvent.change(categorySelect, { target: { value: "house" } });
    fireEvent.click(isDepositInput);
    fireEvent.click(isNotDepositInput);
    fireEvent.click(saveButton);

    const mockedUpdateDoc = mocked(updateDoc);

    await waitFor(() => {
      expect(mockedUpdateDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          name: "new-name",
          price: 123,
          category: "house",
        })
      );
      expect(onCloseMocked).toHaveBeenCalled();
      expect(
        screen.getByText("Transação editada com sucesso")
      ).toBeInTheDocument();
    });
  });

  it("should display toast on edit transaction error", async () => {
    const onCloseMocked = jest.fn();
    renderWithToastify(
      <EditTransactionModal
        isOpen={true}
        onClose={onCloseMocked}
        transaction={transaction}
      />
    );

    const mockedUpdateDoc = mocked(updateDoc).mockRejectedValue(new Error());
    const saveButton = screen.getByText("Salvar");

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText("Erro ao editar sua transação")
      ).toBeInTheDocument();
      expect(onCloseMocked).toHaveBeenCalled();
    });
  });

  it("should be able to delete transaction", async () => {
    const onCloseMocked = jest.fn();
    render(
      <EditTransactionModal
        isOpen={true}
        onClose={onCloseMocked}
        transaction={transaction}
      />
    );

    const mockedDeleteDoc = mocked(deleteDoc);
    const deleteButton = screen.getByText("Deletar");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedDeleteDoc).toHaveBeenCalled();
      expect(onCloseMocked).toHaveBeenCalled();
    });
  });

  it("should display toast on delete transaction error", async () => {
    const onCloseMocked = jest.fn();
    renderWithToastify(
      <EditTransactionModal
        isOpen={true}
        onClose={onCloseMocked}
        transaction={transaction}
      />
    );

    const mockedDeleteDoc = mocked(deleteDoc).mockRejectedValue(new Error());
    const deleteButton = screen.getByText("Deletar");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("Erro ao deletar sua transação")
      ).toBeInTheDocument();
      expect(onCloseMocked).toHaveBeenCalled();
    });
  });
});
