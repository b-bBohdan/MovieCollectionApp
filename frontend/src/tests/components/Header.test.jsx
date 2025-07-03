import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header";

// mocking dependencies
vi.mock("../../components/LoginModal", () => ({
  default: vi.fn(() => <div data-testid="login-modal">Mock Login Modal</div>),
}));

// mock context hook
vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

describe("Header Component", async () => {
  // actual mock after vi.mock calls
  const { useUser } = await import("../../context/UserContext");

  beforeEach(() => {
    vi.clearAllMocks();
    useUser.mockReturnValue({
      user: null,
      isAuthenticated: false,
    });
  });

  it("should show LoginModal when login button is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(screen.getByTestId("login-modal")).toBeInTheDocument();
  });

  it("should not show LoginModal initially", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("login-modal")).not.toBeInTheDocument();
  });

  it("should not show login button when authenticated", () => {
    // authenticated user
    useUser.mockReturnValue({
      user: { pp_Url: "test.jpg" },
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("button", { name: /login/i })
    ).not.toBeInTheDocument();
  });
});
