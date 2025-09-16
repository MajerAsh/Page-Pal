import { useEffect, useState } from "react";
import { Link } from "react-router";
import fillerImage from "../assets/filler.jpg";

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
      <p className="caption">
        Click a book to view more details or reserve it today.
      </p>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.title}
              <br />
              <img
                src={book.coverimage}
                alt={`Cover of ${book.title}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fillerImage;
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
