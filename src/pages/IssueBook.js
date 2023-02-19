import { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import "../Css/IssueBook.css";
import "../Styles/IssueBook.scss";
import { FormatISBN } from "../helpers/isbn.format";
import { FormatStudID } from "../helpers/studID.format";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../components/SweetAlert/SweetAlert";
// import Qr from "../assets/profile.png";
// import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";

const IssueBook = () => {
  const [isbn, setISBN] = useState("000-0000-000");
  const issueRef = useRef();
  const [title, setTitle] = useState("Book Title");
  const [studId, setStudId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [scan, setScan] = useState(false);

  const handleISBN = (e) => {
    const formatedISBN = FormatISBN(e.target.value);
    setISBN(formatedISBN);
  };
  const handleStudId = (e) => {
    const formatedStudID = FormatStudID(e.target.value);
    setStudId(formatedStudID);
  };

  useEffect(() => {
    issueRef.current.focus();
    const issue = JSON.parse(sessionStorage.getItem("issue"));

    if (issue) {
      setISBN(issue.isbn);
      setTitle(issue.title);
    }
  }, []);

  // ISSUE BOOK API INTEGRATION
  const configData = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/issueBook/issue`,
    data: {
      isbn,
      title,
      studId,
      name,
      email,
      issueDate,
      returnDate,
    },
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();

    await axios(configData)
      .then((result) => {
        sessionStorage.removeItem("issue");

        Toast.fire({
          icon: "success",
          title: result.data.message,
        }).then(() => window.location.reload(false));
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });
  };

  const Scanner = (
    <>
      <QrReader
        onResult={async (result, error) => {
          if (result) {
            const url = `${process.env.REACT_APP_API_URL}/issueBook/issue/getBook/${result}`;

            await axios
              .get(url)
              .then((results) => {
                results.data.map((props) => {
                  setISBN(props.isbn);
                  setTitle(props.title);

                  // set the value in to make it persistent
                  sessionStorage.setItem(
                    "issue",
                    JSON.stringify({
                      isbn: props.isbn,
                      title: props.title,
                    })
                  );

                  window.location.reload(false);
                  return true;
                });
              })
              .catch((err) => {
                Toast.fire({
                  icon: "error",
                  title: err.response.data.message,
                });
              });
          }
        }}
        style={{ position: "unset", top: "0" }}
      />
      <div className="boxScanner"></div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="issue-book-container">
        <div className="nav-side">
          <Sidebar issue="active" />
        </div>
        <div className="form-wrapper">
          <form action="" onSubmit={(e) => HandleSubmit(e)}>
            <div className="issue-field">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                placeholder="Enter isbn"
                required
                autoComplete="off"
                // onChange={handleISBN}
                // value={isbn}
                // value={scan ? isbn : "000-0000-000"}
                value={isbn}
                maxLength="12"
                readOnly
              />
            </div>
            <div className="issue-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                required
                autoComplete="off"
                readOnly
                // value={scan ? title : "Book"}
                value={title}
                // onChange={(e) => setTitle(e.target.value.toUpperCase())}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="studID">Student I.D.</label>
              <input
                type="text"
                ref={issueRef}
                id="studID"
                placeholder="Enter stud id"
                required
                autoComplete="off"
                value={"AY" + studId}
                onChange={(e) => handleStudId(e)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                required
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="dateIssue">Issue</label>
              <input
                type="date"
                id="dateIssue"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="dateReturn">Return</label>
              <input
                type="date"
                id="dateReturn"
                required
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
            <button id="btn-issue">Issue</button>
          </form>
          <div className="qr-box">
            <div className="upper-box">
              <div className="img-box">
                {scan ? Scanner : <p>Camera is Off</p>}
              </div>
              {/* <div className="img-box">{Scanner}</div> */}
            </div>
            <div className="bottom-box">
              <button type="button" onClick={() => setScan(true)}>
                Scan
              </button>
              <button onClick={() => window.location.reload(false)}>
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueBook;
