import { render, screen, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import { withSidebar } from "../../../components/hocs/withSidebar";
import { useFirebaseAuth } from "../../../contexts/FirebaseAuthContext";

jest.mock("next/router", () => {
  return {
    useRouter: () => ({
      asPath: "/dashboard",
    }),
  };
});
jest.mock("../../../contexts/FirebaseAuthContext.tsx");

describe("withSidebar", () => {
  it("should render correctly", () => {
    const mockedComponent = jest.fn(() => null);
    const useFirebaseAuthMocked = mocked(useFirebaseAuth);
    const Component = withSidebar(mockedComponent);

    useFirebaseAuthMocked.mockReturnValueOnce({
      isAuthLoading: false,
    } as any);

    render(<Component />);

    expect(screen.getByAltText("my bills")).toBeInTheDocument();
    expect(mockedComponent).toBeCalled();
  });

  it("should render <LoadingSplash/> when auth is loading", async () => {
    const useFirebaseAuthMocked = mocked(useFirebaseAuth);
    const mockedComponent = jest.fn(() => null);
    const Component = withSidebar(mockedComponent);

    useFirebaseAuthMocked.mockReturnValueOnce({
      isAuthLoading: true,
      user: null,
    } as any);

    render(<Component />);

    expect(screen.getByAltText("My Bills")).toBeInTheDocument();
  });
});
