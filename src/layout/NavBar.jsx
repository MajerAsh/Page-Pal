// layout/Navbar.jsx
import { NavLink } from "react-router";
import { useAuth } from "../Auth/Auth.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>Book Buddy</h1>
      <nav>
        <NavLink to="/">Home</NavLink> <NavLink to="/books">Books</NavLink>{" "}
        {user ? (
          <>
            <NavLink to="/account">Account</NavLink>{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>{" "}
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
