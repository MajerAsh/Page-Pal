import { useAuth } from "../Auth/Auth.jsx";

export default function Account() {
  const { user, returnBook } = useAuth();

  if (!user) {
    return (
      <p>
        <a href="/login">Log in</a> or <a href="/register">register</a> to see
        your account.
      </p>
    );
  }

  return (
    <div>
      <h2>Account</h2>
      <p>Email: {user.email}</p>

      <h3>Your Reservations</h3>
      {user.reservations?.length > 0 ? (
        <ul>
          {user.reservations.map((r) => (
            <li key={r.id}>
              <strong>{r.title}</strong> by {r.author}
              <button onClick={() => returnBook(r.bookid)}>Return</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations yet.</p>
      )}
    </div>
  );
}
