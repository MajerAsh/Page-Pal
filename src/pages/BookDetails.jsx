import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/Auth.jsx";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const { user, reserveBook } = useAuth();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBook();
  }, [id]);

  const handleReserve = async () => {
    try {
      user.reservations = [...(user.reservations || []), { bookid: book.id }]; //9.12.25
      await reserveBook(book.id);
    } catch {
      alert(`Sorry but ${book.title} is already check out by another user.`);
    }
  };

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      {book.coverimage ? (
        <img src={book.coverimage} alt={`Cover of ${book.title}`} />
      ) : (
        <div>
          <p>No cover image available for {book.title}</p>
        </div>
      )}

      {user ? (
        <button
          aria-label="Reserve this book"
          onClick={handleReserve}
          disabled={user.reservations?.some((r) => r.bookid === book.id)}
        >
          {user.reservations?.some((r) => r.bookid === book.id)
            ? "Reserved"
            : "Reserve"}
        </button>
      ) : (
        <p>
          <a href="/login">Log in</a> to reserve this book.
        </p>
      )}
    </div>
  );
}
