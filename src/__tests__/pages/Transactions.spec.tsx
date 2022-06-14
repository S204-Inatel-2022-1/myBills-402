import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import { withSidebar } from "../../components/hocs/withSidebar";
import {
  FirebaseAuthProvider,
  useFirebaseAuth,
} from "../../contexts/FirebaseAuthContext";
import { TransactionsPage } from "../../pages/transactions";

jest.mock("next/router", () => {
  return {
    useRouter: () => ({
      asPath: "/dashboard",
    }),
  };
});

describe("Home/Login page", () => {
  it("should render correctly", async () => {
    // const useFirebaseAuthMocked = mocked(useFirebaseAuth);
    // useFirebaseAuthMocked.mockReturnValueOnce({
    //   isAuthLoading: false,
    //   user: {
    //     id: "1",
    //     name: "John Doe",
    //     email: "john@doe.com",
    //     avatar: "user-avatar",
    //   },
    // } as any);
    const mockedWithSidebar = mocked(withSidebar);
    const Component = mockedWithSidebar(TransactionsPage);
    render(
      <FirebaseAuthProvider>
        
        <Component />
      </FirebaseAuthProvider>
    );

  
  });
});
