import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { renderWithProviders } from "../test_utils";
import "@testing-library/jest-dom";
import Home from "../pages/index";

test("loads the page", async () => {
  renderWithProviders(<Home />);
  expect(screen.getByText(/Pokémon Team Builder/i)).toBeInTheDocument();
});
