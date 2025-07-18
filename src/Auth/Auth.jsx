import { useEffect, useState } from "react";
import { AuthContext } from "../Auth/context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/account");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setUser(data);
  };

  const register = async (email, password) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();
    setUser(data);
  };

  const reserveBook = async (bookId) => {
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });
    if (!res.ok) throw new Error("Failed to reserve");
    const reservation = await res.json();
    setUser((prev) => ({
      ...prev,
      reservations: [
        ...prev.reservations,
        { ...reservation, title: "", author: "" },
      ],
    }));
  };

  const returnBook = async (bookId) => {
    const res = await fetch(`/api/reservations/${bookId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to return");
    setUser((prev) => ({
      ...prev,
      reservations: prev.reservations.filter((r) => r.bookid !== bookId),
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, reserveBook, returnBook }}
    >
      {children}
    </AuthContext.Provider>
  );
}
