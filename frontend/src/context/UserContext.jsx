import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      });

    console.log("Fetch status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched user:", data);
      setUser(data);
      setIsAuthenticated(true);
    } else {
      console.warn("Not authenticated");
      setIsAuthenticated(false);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setIsAuthenticated(false);
  } finally {
    setLoading(false);
  }
  };

  

  return (
    <UserContext.Provider value={{
      user, setUser,
      isAuthenticated, setIsAuthenticated,
      loading, setLoading,
      fetchUser , // ← include it here
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
