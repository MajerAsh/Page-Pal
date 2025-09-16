import { useEffect, useState } from "react";
import { Link } from "react-router";
import fillerImage from "../assets/filler.jpg";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(""); // search state

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  //search filter
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>Book Catalog</h2>
      <p className="caption">
        Click a book to view more details or reserve it today.
      </p>
      <input
        className="searchbar"
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search books"
      />
      <ul>
        {filteredBooks.map((book) => (
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
        {filteredBooks.length === 0 && (
          <li>No books found matching your search.</li>
        )}
      </ul>
    </>
  );
}
