import { render, screen } from "@testing-library/react";
import { LoadingSplash } from "../../components/LoadingSplash";

describe("LoadingSplash component", () => {
  it("should render correctly", () => {
    render(<LoadingSplash />);

    expect(screen.getByAltText("My Bills")).toBeInTheDocument();
  });
});
