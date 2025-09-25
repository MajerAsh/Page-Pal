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
      <h2>Hi, {user.firstname}!</h2>
      <section className="account-card">
        <h2>Account</h2>
        <div className="account-info">
          <strong>Name:</strong> {user.firstname}
          {user.lastname ? ` ${user.lastname}` : ""}
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        </div>
        <div className="account-reservations">
          <h3>Your Reservations</h3>
          {user.reservations?.filter((r) => r && r.title && r.author).length >
          0 ? (
            <ul>
              {user.reservations
                .filter((r) => r && r.title && r.author)
                .map((r) => (
                  <li key={r?.id}>
                    <strong>{r?.title}</strong> by {r?.author}
                    <img
                      src={r?.coverimage}
                      alt={`cover image for ${r?.title}`}
                    />
                    <p>{r?.description}</p>
                    <br />
                    <button onClick={() => returnBook(r?.id)}>Return</button>
                  </li>
                ))}
            </ul>
          ) : (
            <p>No reservations yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
