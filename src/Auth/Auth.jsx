import { createContext, useContext, useState, useEffect } from "react"; //anded use context and create cntext 7/20
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  const getUser = async () => {
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
    console.log("data", data);
    setUser(data);
  };

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
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
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
    await getUser();
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

//7/20   vvv
export function useAuth() {
  // the hook
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
