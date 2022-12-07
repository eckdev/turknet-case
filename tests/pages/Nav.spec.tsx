import { render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import NavBar from "../../pages/nav";
import ReactDayAndNightToggle from '../__mocks__/react-day-and-night-toggle.js'


describe("Nav", () => {
  test("should render correctly", () => {
    render(<NavBar />);

    expect(screen.getByText("TurkNet Case")).toBeInTheDocument();
  });
});