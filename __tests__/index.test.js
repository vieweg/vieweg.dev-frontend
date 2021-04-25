import { render, screen } from "@testing-library/react";

import Home from "../pages/index";

describe("Application running without crashes", () => {
  

  test("Head of aplication rending appropriated", () => {
    const {getByText} = render(<Home />);
    expect(getByText("Get started by editing")).toBeInTheDocument();
  });

  test("Footer of aplication rending appropriated", () => {
    const {getByText} = render(<Home />);
    expect(getByText("Powered by")).toBeInTheDocument();
  });

});

