import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/Auth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await register({ firstname, lastname, email, password });
      navigate("/account");
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="firstname" placeholder="First name" required />
      <br />
      <input name="lastname" placeholder="Last name" required />
      <br />
      <input name="email" type="email" placeholder="Email" required />
      <br />
      <input name="password" type="password" placeholder="Password" required />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
