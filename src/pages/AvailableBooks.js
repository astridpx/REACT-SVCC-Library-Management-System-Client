import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import "../Css/AvailableBooks.css";
import "../Styles/AvailableBooks.scss";
import axios from "axios";

const AvailableBooks = () => {
  const [availBooklist, setAvailBookList] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    let availCleanup = true;
    const url = `${process.env.REACT_APP_API_URL}/books/availableBooks`;

    axios
      .get(url)
      .then((result) => {
        const availBooks = result.data.map((props) => {
          return (
            <tr key={props.BOOK_ID}>
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td className="author-box">{props.author}</td>
              <td>{props.published_date}</td>
            </tr>
          );
        });
        setAvailBookList(availBooks);
      })
      .catch((err) => console.log(err));

    return () => {
      availCleanup = false;
    };
  }, []);

  const HandleSearchClick = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/books/search/availableBooks/${searchKey}`,
    })
      .then((result) => {
        const booksFilter = result.data.map((props) => {
          return (
            <tr key={props.BOOK_ID}>
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td className="author-box">{props.author}</td>
              <td>{props.published_date}</td>
            </tr>
          );
        });
        setBookSearch(booksFilter);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="books-container">
        <div className="nav-side">
          <Sidebar availBook="active" />
        </div>
        <div className="book-section">
          <section>
            <header>
              {/* content */}
              <h2> Available Books </h2>
              <div className="search-box">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search here..."
                    id="search"
                    autoComplete="off"
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <button
                    className="btn-search"
                    onClick={() => {
                      HandleSearchClick();
                      setShowBookSearch(true);
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </header>
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th id="bookID">ISBN</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Date Published</th>
                  </tr>
                </thead>
                <tbody>
                  {availBooklist.length > 0 && !showBookSearch ? (
                    availBooklist
                  ) : showBookSearch ? (
                    bookSearch
                  ) : (
                    <tr>
                      <td>NO AVAILABLE BOOKS</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AvailableBooks;
