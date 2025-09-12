import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  ); //staylogged in on refresh^
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error("Login failed");
      setUser(data);
    }

    if (token) {
      localStorage.setItem("token", token);
      fetchUser();
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = async ({ email, password }) => {
    const res = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    console.log("data", data);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token"); // remove persist token from local storage
    console.log("Logout successful");
  };

  const register = async ({ email, password, firstname, lastname }) => {
    const res = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname }),
      }
    );
    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem("token", data.token); // persist token
  };

  const reserveBook = async (bookId) => {
    const res = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      }
    );
    const reservation = await res.json();

    if (!res.ok) throw new Error(reservation.message);
    const userRes = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = await userRes.json();
    setUser(userData);
  };

  const returnBook = async (id) => {
    const res = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to return");
    setUser((prev) => ({
      ...prev,
      reservations: prev.reservations.filter((r) => r.id !== id),
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        reserveBook,
        returnBook,
      }} /*making everything defined in this file global*/
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // the hook
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
