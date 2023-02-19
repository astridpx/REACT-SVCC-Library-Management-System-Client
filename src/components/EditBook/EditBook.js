import React, { useEffect, useRef, useState } from "react";
// import "../../Css/FormAdd.css";
import "../AddBook/FormAdd.scss";
import Logo from "../../assets/addBook-logo-form.png";
import { IoClose } from "react-icons/io5";
import { FormatISBN } from "../../helpers/isbn.format";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../SweetAlert/SweetAlert";

export const EditBookForm = ({ hideEditForm, data }) => {
  const [bookId, setBookId] = useState("");
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");

  const valueEdit = false;
  const bookRef = useRef();

  useEffect(() => {
    bookRef.current.focus();

    data.map((value) => {
      setBookId(value.id);
      setIsbn(value.isbn);
      setTitle(value.title);
      setAuthor(value.author);
      setPublished(value.publish);
      return value;
    });
  }, []);

  const configuration = {
    method: "put",
    url: `${process.env.REACT_APP_API_URL}/books/updateBook/${bookId}`,
    data: {
      isbn,
      title,
      author,
      published,
    },
  };

  // api request
  const HandleSubmit = async (e) => {
    e.preventDefault();

    // UPDATE API INTEGRATION
    await axios(configuration)
      .then((res) => {
        Toast.fire(
          {
            icon: "success",
            title: res.data.message,
          },
          hideEditForm(valueEdit)
        ).then(() => window.location.reload(false));
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={(e) => HandleSubmit(e)}>
          <button
            id="btn-close"
            onClick={(e) => {
              e.preventDefault();
              hideEditForm(valueEdit);
            }}
          >
            <IoClose />
          </button>
          <header>
            <div className="logo-wrapper">
              <img src={Logo} alt="" />
            </div>
            <h2>Update Books</h2>
          </header>

          <div className="form-field">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              ref={bookRef}
              required
              autoComplete="off"
              value={isbn}
              onChange={(e) => {
                const formatedISBN = FormatISBN(e.target.value);
                setIsbn(formatedISBN);
                FormatISBN();
              }}
            />
          </div>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              required
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value.toUpperCase())}
            />
          </div>
          <div className="form-field">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              required
              autoComplete="off"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="datePublished">Date Published</label>
            <input
              type="date"
              id="datePublished"
              required
              autoComplete="off"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
            />
          </div>
          <button id="btn-save" type="submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
};
