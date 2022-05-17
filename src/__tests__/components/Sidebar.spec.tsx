import { render, screen } from "@testing-library/react";
import { Sidebar } from "../../components/Sidebar";

jest.mock("next/router", () => {
  return {
    useRouter: () => ({
      asPath: "/dashboard",
    }),
  };
});

describe("Sidebar", () => {
  it("should render correctly", () => {
    render(<Sidebar />);

    expect(screen.getByAltText("my bills")).toBeInTheDocument();
  });
});
