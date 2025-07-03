import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

describe("searchBar tests", () => {
  it("renders", () => {
    render(<SearchBar></SearchBar>);

    expect(document.getElementById("search-bar")).toBeInTheDocument();
  });

  it("calls a function on pressing button", () => {
    //arrange
    const mockSetSearch = vi.fn();
    const mockOnSearchClick = vi.fn();

    render(
      <SearchBar setSearch={mockSetSearch} onSearchClick={mockOnSearchClick} />
    );

    //act

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // assert // button submits the form/triggers a callback
    expect(mockOnSearchClick).toHaveBeenCalled();
  });

  it("updates the value correctly", () => {
    render(<SearchBar setSearch={vi.fn()} onSearchClick={vi.fn()} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(input.value).toBe("new value");
  });

  //   it("submits the search query", () => {
  //     const mockSubmit = vi.fn();
  //     render(<SearchBar onSubmit={mockSubmit} />);

  //     const input = screen.getByRole("textbox");
  //     fireEvent.change(input, { target: { value: "react" } });

  //     const form = screen.getByRole("form");
  //     fireEvent.submit(form);

  //     expect(mockSubmit).toHaveBeenCalledWith("react");
  //   });
});
