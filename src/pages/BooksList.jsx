import { useEffect, useState } from "react";
import { Link } from "react-router";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";

export default function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  return (
    <>
      <h2>Book Catalog</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.title}
              <br />
              <img
                src={book.coverimage || ""}
                alt={
                  book.coverimage
                    ? `Cover of ${book.title}`
                    : `Image not available for ${book.title}`
                }
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
