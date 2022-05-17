import { screen, render, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { useFirebaseAuth } from "../../contexts/FirebaseAuthContext";
import Home from "../../pages";

jest.mock("../../contexts/FirebaseAuthContext.tsx");
jest.mock("next/router");

describe("Home/Login page", () => {
  it("should render correctly", async () => {
    const useFirebaseAuthMocked = mocked(useFirebaseAuth);
    useFirebaseAuthMocked.mockReturnValueOnce({
      isAuthLoading: false,
      user: null,
    } as any);

    render(<Home />);

    expect(screen.getByText("Bem-vindo")).toBeInTheDocument();
    expect(
      screen.getByText("Faça login com o Google para começar!")
    ).toBeInTheDocument();
  });

  it("should render <LoadingSplash/> when auth is loading", async () => {
    const useFirebaseAuthMocked = mocked(useFirebaseAuth);

    useFirebaseAuthMocked.mockReturnValueOnce({
      isAuthLoading: true,
      user: null,
    } as any);

    render(<Home />);

    expect(screen.getByAltText("My Bills")).toBeInTheDocument();
    expect(screen.queryByText("Bem-vindo")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Faça login com o Google para começar!")
    ).not.toBeInTheDocument();
  });

  it("should call login function on button click", () => {
    const useFirebaseAuthMocked = mocked(useFirebaseAuth);
    const mockedHandleLogin = jest.fn();

    useFirebaseAuthMocked.mockReturnValueOnce({
      handleLogin: mockedHandleLogin,
      isAuthLoading: false,
      user: null,
    } as any);

    render(<Home />);

    const loginButton = screen.getByRole("button");

    fireEvent.click(loginButton);

    expect(mockedHandleLogin).toHaveBeenCalled();
  });

  it("should redirect to dashboard if there is already a user logged in", () => {
    const useFirebaseAuthMocked = mocked(useFirebaseAuth);
    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn();

    useRouterMocked.mockReturnValue({
      push: pushMocked,
    } as any);

    useFirebaseAuthMocked.mockReturnValueOnce({
      isAuthLoading: false,
      user: {
        name: "John Doe",
        email: "john@doe.com",
        avatar: "john-doe",
      },
    } as any);

    render(<Home />);

    expect(pushMocked).toHaveBeenCalledWith("/transactions");
  });
});
