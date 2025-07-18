import { useState } from "react";
import { useNavigate } from "react-router"; // ✅ from react-router
import { useAuth } from "../Auth/Auth.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate(); // ✅
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login({ email, password });
      navigate("/account"); // ✅ redirect on success
    } catch (err) {
      setError(err.message || "Login failed. Check your email and password.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="email" type="email" placeholder="Email" required />
      <br />
      <input name="password" type="password" placeholder="Password" required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
