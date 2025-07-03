import { describe, it, expect, vi, beforeEach, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useUser } from "../../context/UserContext";
import UserContextProvider from "../../context/UserContext";
import React from "react";

function TestComponent() {
  const { user, fetchUser } = useUser();

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <p data-testid="userName">{user?.username ?? "No user"}</p>;
}

describe("UserContext", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Stores the user data from fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        _id: "1",
        email: "1",
        username: "tester",
        likes: [],
        password: null,
        pp_Url: null,
        provider: null,
      }),
    });

    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("userName").textContent).toBe("tester");
    });
  });
});

// const spy = vi.spyOn(fetch, '')
// spy.mockResolvedValue(JSON({
//     _id: "1",
//     email: "1",
//     username: "tester",
//     likes: [],
//     password:  null,
//     pp_Url: null,
//     provider: null,
// }));

// function TestComponent() {
//   const { user } = useUser();
//   return <p data-testid="userName">{user?.name ?? "No user"}</p>;
// }

// describe("UserContext", () => {
//   it("Stores the user data", () => {

//     render(
//       <UserContextProvider>
//         <TestComponent />
//       </UserContextProvider>
//     );

//     // Simulate user being set manually
//     // (or if you want to test fetchUser, you'd need to mock the fetch)

//     expect(screen.getByTestId("userName").textContent).toBe("tester");
//   });
// });
