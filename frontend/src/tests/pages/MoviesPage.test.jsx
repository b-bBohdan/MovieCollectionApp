import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import MoviesPage from "../../pages/MoviesPage";
import * as MainPageModule from "../../pages/MoviesPage";

const MockLayout = () => {
  const { Outlet } = require("react-router-dom");
  return (
    <div data-testid="mock-root-layout">
      <Outlet />
    </div>
  );
};

vi.mock("../../components/movie/Container", () => ({
  default: vi.fn(({ movies }) => (
    <div data-testid="container">{movies[0].Title}</div>
  )),
}));

vi.mock("../../components/SearchBar", () => ({
  default: vi.fn(() => <div data-testid="searchBar">Searchbar component</div>),
}));

describe("MoviesPage route", () => {
  it("renders MovieContainer if loader returns data", async () => {
    vi.spyOn(MainPageModule, "loader").mockResolvedValue([
      {
        imdbID: "tt1234567",
        Title: "Mock Movie",
        Year: "2023",
      },
    ]);

    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <MockLayout />,
          children: [
            {
              index: true,
              element: <MoviesPage />,
              loader: MainPageModule.loader,
            },
          ],
        },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      screen.debug();
      expect(screen.getByTestId("searchBar")).toBeInTheDocument();
      expect(screen.getByText(/mock movie/i)).toBeInTheDocument();
    });
  });
});
