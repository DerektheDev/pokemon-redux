import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { renderWithProviders } from "../test_utils";
import "@testing-library/jest-dom";
import Home from "../pages/index";

test("loads the page", async () => {
  renderWithProviders(<Home />);
  expect(screen.getByText(/Pokémon Team Builder/i)).toBeInTheDocument();
});

describe("searching for pokemon", () => {
  it("searches for pokemon by type", async () => {
    renderWithProviders(<Home />);

    // const searchButton = await screen.getByRole("button", { name: "Search" });

    // fireEvent.click(searchButton);

    const searchValueSelect = screen.getByDisplayValue("type");

    await waitFor(() => {
      normalSearchValue = screen.getByText(/normal/i);
      expect(normalSearchValue).toBeInTheDocument();
    });

    fireEvent.change(searchValueSelect, { target: { value: "fire" } });

    await waitFor(() => {
      const normalSearchValue = screen.getByText(/charmander/i);
      expect(normalSearchValue).toBeInTheDocument();
    });

    // await waitFor(() => {
    //   const pidgey = console.log(screen.getByText(/pidgey/i));
    //   expect(pidgey).toBeInTheDocument();
    // });

    // expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it("searches for pokemon by generation", () => {
    // const searchKeySelect = screen.getByDisplayValue("type");
    // fireEvent.change(searchKeySelect, { target: { value: "generation" } });
  });
});

describe("removal", () => {
  it("allows pokemon to be removed from the team", () => {
    //
  });
});

describe("limit", () => {
  it("does not allow more than 6 pokemon to be in the team", () => {
    //
  });
});
