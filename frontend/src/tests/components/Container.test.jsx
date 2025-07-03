import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieContainer from "../../components/movie/Container";

// mocking movie.jsx
vi.mock("../../components/movie/Movie", () => ({
  default: vi.fn(({ movie }) => (
    <div data-testid="movie" key={movie.imdbID}>
      {movie.Title}
    </div>
  )),
}));

// mock context hook
vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

describe("Film container test", async () => {
  const { useUser } = await import("../../context/UserContext");

  beforeEach(() => {
    vi.clearAllMocks();
    useUser.mockReturnValue({
      user: null,
      isAuthenticated: false,
    });
  });

  it("should render paragraph if not array", () => {
    render(<MovieContainer movies={null}></MovieContainer>);

    expect(screen.getByText(/Invalid movie data/i)).toBeInTheDocument();
  });

  it("should render movie", () => {
    const mockMovies = [
      {
        Title: "TestMovie123",
        imdbID: "123",
      },
      {
        Title: "TestMovie123f4",
        imdbID: "12",
      },
      {
        Title: "TestMovie1233",
        imdbID: "1",
      },
      {
        Title: "TestMovie1233",
        imdbID: "9",
      },
    ];

    render(<MovieContainer movies={mockMovies}></MovieContainer>);

    expect(screen.queryAllByTestId(/movie/i).length).toBeGreaterThanOrEqual(4);
  });
});
