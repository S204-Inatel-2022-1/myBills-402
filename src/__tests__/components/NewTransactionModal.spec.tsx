import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import { addDoc } from "firebase/firestore";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { ToastContainer } from "react-toastify";

jest.mock("firebase/firestore");
jest.mock("../../contexts/FirebaseAuthContext.tsx", () => ({
  useFirebaseAuth: () => ({
    user: {
      id: "fake-id",
    },
  }),
}));

export const renderWithToastify = (component: JSX.Element) => {
  return render(
    <div>
      <ToastContainer autoClose={3000} />
      {component}
    </div>
  );
};

describe("New transaction modal", () => {
  it("should render correctly", () => {
    render(<NewTransactionModal isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText("Cadastrar Transação")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("should not render if closed", () => {
    render(<NewTransactionModal isOpen={false} onClose={jest.fn()} />);

    expect(screen.queryByText("Cadastrar Transação")).not.toBeInTheDocument();
    expect(screen.queryByText("Cadastrar")).not.toBeInTheDocument();
  });

  it("should not be able to create transaction with empty name and price", async () => {
    render(<NewTransactionModal isOpen={true} onClose={jest.fn()} />);

    const button = screen.getByText("Cadastrar");
    const mockedAddDoc = mocked(addDoc);

    fireEvent.click(button);

    expect(mockedAddDoc).not.toHaveBeenCalled();
  });

  it("should send category with other if category is not selected", async () => {
    const onCloseMocked = jest.fn();
    renderWithToastify(
      <NewTransactionModal isOpen={true} onClose={onCloseMocked} />
    );
    const button = screen.getByText("Cadastrar");
    const nameInput = screen.getByPlaceholderText("Nome");
    const isDepositInput = screen.getByText("Entrada");
    const valueInput = screen.getByPlaceholderText("Preço");

    const mockedAddDoc = mocked(addDoc).mockResolvedValueOnce({
      id: "fake-id",
      type: "document",
    } as any);

    fireEvent.change(nameInput, { target: { value: "Teste" } });
    fireEvent.change(valueInput, { target: { value: "123" } });
    fireEvent.click(isDepositInput);
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAddDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          authorId: "fake-id",
          name: "Teste",
          price: 123,
          isDeposit: true,
          category: "other",
        })
      );
      expect(
        screen.getByText("Transação adicionada com sucesso")
      ).toBeInTheDocument();
      expect(onCloseMocked).toHaveBeenCalled();
    });
  });

  it("should be able to create transaction", async () => {
    const onCloseMocked = jest.fn();
    renderWithToastify(
      <NewTransactionModal isOpen={true} onClose={onCloseMocked} />
    );
    const button = screen.getByText("Cadastrar");
    const nameInput = screen.getByPlaceholderText("Nome");
    const valueInput = screen.getByPlaceholderText("Preço");
    const categorySelect = screen.getByTestId("select");
    const isDepositInput = screen.getByText("Saída");

    const mockedAddDoc = mocked(addDoc).mockResolvedValueOnce({
      id: "fake-id",
      type: "document",
    } as any);

    fireEvent.change(nameInput, { target: { value: "Teste" } });
    fireEvent.change(valueInput, { target: { value: "123" } });
    fireEvent.change(categorySelect, { target: { value: "food" } });
    fireEvent.click(isDepositInput);
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAddDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          authorId: "fake-id",
          name: "Teste",
          price: 123,
          category: "food",
          isDeposit: false,
        })
      );
      expect(
        screen.getByText("Transação adicionada com sucesso")
      ).toBeInTheDocument();
      expect(onCloseMocked).toHaveBeenCalled();
    });
  });

  it("should display toast on error", async () => {
    const onCloseMocked = jest.fn();
    renderWithToastify(
      <NewTransactionModal isOpen={true} onClose={onCloseMocked} />
    );

    const button = screen.getByText("Cadastrar");
    const nameInput = screen.getByPlaceholderText("Nome");
    const valueInput = screen.getByPlaceholderText("Preço");
    const mockedAddDoc = mocked(addDoc).mockRejectedValueOnce(new Error());

    fireEvent.change(nameInput, { target: { value: "Teste" } });
    fireEvent.change(valueInput, { target: { value: "123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Erro ao criar sua transação")
      ).toBeInTheDocument();
      expect(onCloseMocked).toHaveBeenCalled();
    });
  });
});
