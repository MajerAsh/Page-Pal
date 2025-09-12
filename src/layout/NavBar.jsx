import { NavLink } from "react-router";
import { useAuth } from "../Auth/Auth.jsx";
import Logo from "../assets/logo.svg?react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>
        Page Pal
        <Logo style={{ width: 28, height: 28, verticalAlign: "middle" }} />
      </h1>
      <nav>
        <NavLink to="/">Home</NavLink> <NavLink to="/books">Books</NavLink>{" "}
        {user ? (
          <>
            <NavLink to="/account">Account</NavLink>{" "}
            <a onClick={logout}>Logout</a>
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
