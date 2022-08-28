import React from "react";
import { fireEvent, waitFor, screen, act } from "@testing-library/react";

import { renderWithProviders } from "./test_utils";
import "@testing-library/jest-dom";
import Home from "../pages/index";

beforeEach(async () => await act(() => renderWithProviders(<Home />)));

test("loads the page", async () => {
  expect(screen.getByText(/Pokémon Team Builder/i)).toBeInTheDocument();
});

describe("searching for pokemon", () => {
  it("searches for pokemon by type", async () => {
    const searchValueSelect = screen.getByTestId("search-value-select");
    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(searchValueSelect).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await act(() => fireEvent.click(searchButton));

    const pidgey = screen.getByText(/pidgey/i);
    expect(pidgey).toBeInTheDocument();
  });

  it("searches for pokemon by generation", async () => {
    const searchKeySelect = screen.getByTestId("search-key-select");
    const searchValueSelect = screen.getByTestId("search-value-select");
    const searchKey = screen.getByTestId("search-key");
    const searchButton = screen.getByRole("button", { name: "Search" });

    act(() => {
      fireEvent.change(searchKeySelect, { target: { value: "generation" } });
    });

    expect(searchKey).toHaveTextContent("generation");

    act(() => {
      fireEvent.change(searchValueSelect, { target: { value: "1" } });
    });

    await waitFor(() => {
      screen.getByText(/generation i/i);
    });

    await act(() => fireEvent.click(searchButton));

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });
});

describe("removal", () => {
  it("does not allow pokemon to be removed from an empty team", () => {
    const removeTeamMemberButtons = screen.queryAllByTestId(
      "remove-team-member-button"
    );
    expect(removeTeamMemberButtons.length).toBe(0);
  });

  it("allows pokemon to be removed from the team", async () => {
    const searchButton = screen.getByRole("button", { name: "Search" });

    await act(() => fireEvent.click(searchButton));

    const pidgeyAddButton = screen.getByTestId("add-team-member-button");

    await act(() => fireEvent.click(pidgeyAddButton));

    const teamMembers = screen.getAllByTestId("team-member");
    expect(teamMembers.length).toBe(1);

    const pidgeyRemoveButton = screen.getByTestId("remove-team-member-button");

    await act(() => fireEvent.click(pidgeyRemoveButton));

    const teamMembersAfterRemoval = screen.queryAllByTestId("team-member");
    expect(teamMembersAfterRemoval.length).toBe(0);
  });
});

describe("limit", () => {
  it("does not allow more than 6 pokemon to be in the team", async () => {
    const searchButton = screen.getByRole("button", { name: "Search" });

    await act(() => fireEvent.click(searchButton));

    const pidgeyAddButton = screen.getByTestId("add-team-member-button");

    await act(() => {
      Array.from({ length: 10 }, () => fireEvent.click(pidgeyAddButton));
    });

    const teamMembers = screen.getAllByTestId("team-member");
    expect(teamMembers.length).toBe(6);
  });
});
