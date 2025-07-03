import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "../../components/forms/AuthForm";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import * as AuthModule from "../../pages/AuthenticationPage";

describe("AuthForm", () => {
  it("renders buttons", async () => {
    // Create a test router with your actual route configuration
    const mockAction = vi.fn();
    const router = createMemoryRouter(
      [
        {
          path: "/auth",
          element: <AuthForm />,
          action: mockAction, // Your actual action function
        },
      ],
      {
        initialEntries: ["/auth"],
      }
    );

    render(<RouterProvider router={router} />);

    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("submits form", () => {
    const spy = vi.spyOn(AuthModule, "action").mockImplementation(() => {
      return;
    });
    //const mockAction = vi.fn();
    const router = createMemoryRouter(
      [
        {
          path: "/auth",
          element: <AuthForm />,
          action: spy, // Your actual action function
        },
      ],
      {
        initialEntries: ["/auth"],
      }
    );

    render(<RouterProvider router={router} />);

    const form = document.getElementById("auth-form");
    fireEvent.submit(form);

    expect(spy).toBeCalled();
  });
});
