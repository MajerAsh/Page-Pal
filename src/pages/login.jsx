import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/Auth.jsx";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate(); //
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message || "Login failed. Check your email and password.");
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input name="email" type="email" placeholder="Email" required />
      <br />
      <input name="password" type="password" placeholder="Password" required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
