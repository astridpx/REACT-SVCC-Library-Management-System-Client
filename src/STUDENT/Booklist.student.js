import React, { useEffect, useState } from "react";
import Sidebar from "../STUDENT/components/Sidebar.student";
import Navbar from "../components/Navbar";
// import "../Css/AvailableBooks.css";
import "../Styles/AvailableBooks.scss";
import axios from "axios";
import { saveAs } from "file-saver";

const AvailableBooks = () => {
  const [availBooklist, setAvailBookList] = useState("");
  const [isbn, setIsbn] = useState("");
  const [showQr, setShowQr] = useState("none");
  const qrImage = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${isbn}`;

  const [bookSearch, setBookSearch] = useState("");
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const DownloadQr = (value) => {
    saveAs(
      `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${value}`,
      "SVCC-Book-QR" + new Date() + ".jpg"
    );
  };

  useEffect(() => {
    let availCleanup = true;
    const url = "http://localhost:5000/books/availableBooks";

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
              <td className="action">
                <button
                  id="view"
                  onClick={() => {
                    setIsbn(props.isbn);
                    setShowQr("flex");
                  }}
                >
                  View
                </button>
                <button id="download" onClick={() => DownloadQr(props.isbn)}>
                  Download
                </button>
              </td>
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
      url: `http://localhost:5000/books/search/availableBooks/${searchKey}`,
    })
      .then((result) => {
        const booksFilter = result.data.map((props) => {
          return (
            <tr key={props.BOOK_ID}>
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td className="author-box">{props.author}</td>
              <td>{props.published_date}</td>
              <td className="action">
                <button
                  id="view"
                  onClick={() => {
                    setIsbn(props.isbn);
                    setShowQr("flex");
                  }}
                >
                  View
                </button>
                <button id="download" onClick={() => DownloadQr(props.isbn)}>
                  Download
                </button>
              </td>
            </tr>
          );
        });
        setBookSearch(booksFilter);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="bookQr"
        style={{ display: showQr }}
        onClick={() => setShowQr("none")}
      >
        {/* <button>Close</button> */}
        <img src={qrImage} alt="" />
      </div>
      <Navbar />
      <div className="books-container">
        <div className="nav-side">
          <Sidebar availBook="active" />
        </div>
        <div className="book-section">
          <section>
            <header>
              {/* content */}
              <h2> Booklist </h2>
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
                    <th>Action</th>
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
