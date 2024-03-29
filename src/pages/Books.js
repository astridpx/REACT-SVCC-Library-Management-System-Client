import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import "../Css/Books.css";
import "../Styles/Books.scss";
import { Toast } from "../components/SweetAlert/SweetAlert";
import { GrAdd } from "react-icons/gr";
import { FormAdd } from "../components/AddBook/Form.popup";
import { EditBookForm } from "../components/EditBook/EditBook";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../components/Api-Loader/LoadingDark";
import { saveAs } from "file-saver";

const Books = () => {
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [booklist, setBooklist] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [btnHide, setBtnHide] = useState(1);
  // const [btnClose, setBtnClose] = useState(true);
  const [showEditForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState([]);
  const [spiralLoader, setSpiralLoader] = useState(false);

  const [isbn, setIsbn] = useState("");
  const [showQr, setShowQr] = useState("none");
  const qrImage = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${isbn}`;
  const DownloadQr = (value) => {
    saveAs(
      `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${value}`,
      "SVCC-Book-QR" + new Date() + ".jpg"
    );
  };

  // GET BOOKLIST API Integration
  // axios.default.withCredentials = true;
  useEffect(() => {
    let bookCleanup = true;
    const url = `${process.env.REACT_APP_API_URL}/books`;
    setSpiralLoader(true);

    axios
      .get(url)
      .then((result) => {
        const Books = result.data.map((props) => {
          return (
            <tr key={props.BOOK_ID}>
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td className="author-box">{props.author}</td>
              <td>{props.published_date}</td>
              <td className="action1">
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
                  Save
                </button>
              </td>
            </tr>
          );
        });
        setBooklist(Books);
      })
      .catch((error) => alert(error))
      .finally(() => setSpiralLoader(false));

    return () => {
      bookCleanup = false;
    };
  }, []);

  // SEARCH AND FILTER BOOKLIST
  const HandleSearchClick = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/books/search/all-books/${searchKey}`,
    })
      .then((result) => {
        console.log(result);
        const booksfilter = result.data.map((props) => {
          return (
            <tr key={props.BOOK_ID}>
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td className="author-box">{props.author}</td>
              <td>{props.published_date}</td>
              <td className="action1">
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
                  Save
                </button>
              </td>
            </tr>
          );
        });
        setBookSearch(booksfilter);
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
      {/* show hide form */}

      <div className="books-container">
        <div className="nav-side">
          <Sidebar books="active" />
        </div>
        <div className="book-sections">
          <section>
            <header>
              {/* content */}
              <h2> Books List</h2>
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
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loader */}
                  {spiralLoader && (
                    <tr id="BookTbLoader">
                      <td>
                        <Loader />
                      </td>
                    </tr>
                  )}

                  {/* Table Data */}
                  {booklist.length > 0 && !showBookSearch ? (
                    booklist
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

export default Books;
