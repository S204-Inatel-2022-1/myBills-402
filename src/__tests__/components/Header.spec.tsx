import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";
import { Header } from "../../components/Header";
import { useFirebaseAuth } from "../../contexts/FirebaseAuthContext";

jest.mock("../../contexts/FirebaseAuthContext.tsx");

describe("Header component", () => {
  it("renders correctly", () => {
    const useFirebaseAuthMocked = mocked(useFirebaseAuth);

    useFirebaseAuthMocked.mockReturnValue({
      handleLogin: jest.fn(),
      handleLogout: jest.fn(),
      isAuthLoading: false,
      user: {
        id: "fake-id",
        name: "John Doe",
        avatar: "user-avatar",
        email: "john@doe.com",
      },
    });

    render(<Header />);

    expect(screen.getByText(/Olá, John Doe/)).toBeInTheDocument();
    expect(screen.getByText("john@doe.com")).toBeInTheDocument();
    expect(screen.getByAltText("MyBills")).toBeInTheDocument();
  });
});
