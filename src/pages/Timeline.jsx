import { useAuth } from "../Auth/Auth.jsx";

export default function Timeline() {
  const { user } = useAuth();

  if (!user) return <p>Please log in to view your timeline.</p>;

  console.log(user.reservations[0]);

  return (
    <section className="container">
      <h2>Reservation Timeline</h2>
      {user.reservations?.length > 0 ? (
        <ul>
          {user.reservations.map((r) => (
            <li
              key={r.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <img src={r.coverimage} alt={`cover for ${r.title}`} />
              <div>
                <strong>{r.title}</strong> by {r.author}
                <p>{r.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservation history yet.</p>
      )}
    </section>
  );
}
