import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import "../Css/Records.css";
import "../Styles/Records.scss";
import axios from "axios";
import Swal from "sweetalert2";
// import DateTime from "../components/Clock";

const Records = () => {
  const [recordList, setRecordList] = useState("");
  const email = localStorage.getItem("userEmail");
  // const [issueId, setIssueId] = useState("");
  const [showRecordSearch, setShowRecordSearch] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [recordSearch, setRecordSearch] = useState("");

  function isDateBeforeToday(date) {
    const checkDate = new Date(date);
    var now = new Date();
    return checkDate < now;
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    let recordCleanup = true;
    const url = "http://localhost:5000/allRecords/";

    axios.get(url).then((result) => {
      const resultRecord = result.data.map((props) => {
        return (
          <tr
            key={props.ISSUE_ID}
            className={
              isDateBeforeToday(props.return_date) ? "not-return" : null
            }
          >
            <td>{props.isbn}</td>
            <td>{props.title}</td>
            <td>{props.stud_no}</td>
            <td className="name-box">{props.name}</td>
            <td className="email-box">{props.email}</td>
            <td>{new Date(props.issue_date).toDateString()}</td>
            <td>{new Date(props.return_date).toDateString()}</td>
            <td className="action">
              {/* <button id="edit">Edit</button> */}
              <button
                id="delete"
                onClick={() => {
                  Swal.fire({
                    title: "Enter Your Password to Confirm Delete",
                    input: "password",
                    icon: "warning",
                    showCancelButton: true,
                    inputPlaceholder: "Enter your password ",
                  }).then((confirmPassword) => {
                    if (confirmPassword.isConfirmed) {
                      const configData = {
                        method: "delete",
                        url: `http://localhost:5000/allRecords/delete/${props.ISSUE_ID}`,
                        data: {
                          email: email,
                          password: confirmPassword.value,
                        },
                      };
                      axios(configData)
                        .then((result) => {
                          // console.log("result" + result);
                          Toast.fire({
                            icon: "success",
                            title: result.data.message,
                          }).then(() => window.location.reload(false));
                        })
                        .catch((err) => {
                          console.log(configData);
                          if (err) {
                            Toast.fire({
                              icon: "error",
                              showCancelButton: false,
                              title: err.response.data.message,
                              // title: email,
                            });
                          }
                        });
                    }
                  });
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
      setRecordList(resultRecord);
    });
    return () => {
      recordCleanup = false;
    };
  }, []);

  const HandleSearchClick = () => {
    axios({
      method: "get",
      url: `http://localhost:5000/allRecords/${searchKey}`,
    })
      .then((result) => {
        const recordFilter = result.data.map((props) => {
          return (
            <tr
              key={props.ISSUE_ID}
              className={
                isDateBeforeToday(props.return_date) ? "not-return" : null
              }
            >
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td>{props.stud_no}</td>
              <td className="name-box">{props.name}</td>
              <td className="email-box">{props.email}</td>
              <td>{new Date(props.issue_date).toDateString()}</td>
              <td>{new Date(props.return_date).toDateString()}</td>
              <td className="action">
                {/* <button id="edit">Edit</button> */}
                <button
                  id="delete"
                  onClick={() => {
                    Swal.fire({
                      title: "Enter Your Password to Confirm Delete",
                      input: "password",
                      icon: "warning",
                      showCancelButton: true,
                      inputPlaceholder: "Enter your password ",
                    }).then((confirmPassword) => {
                      if (confirmPassword.isConfirmed) {
                        const configData = {
                          method: "delete",
                          url: `http://localhost:5000/allRecords/delete/${props.ISSUE_ID}`,
                          data: {
                            email: email,
                            password: confirmPassword.value,
                          },
                        };
                        axios(configData)
                          .then((result) => {
                            // console.log("result" + result);
                            Toast.fire({
                              icon: "success",
                              title: result.data.message,
                            }).then(() => window.location.reload(false));
                          })
                          .catch((err) => {
                            console.log(configData);
                            if (err) {
                              Toast.fire({
                                icon: "error",
                                showCancelButton: false,
                                title: err.response.data.message,
                                // title: email,
                              });
                            }
                          });
                      }
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        });
        setRecordSearch(recordFilter);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="record-container">
        <div className="nav-side">
          <Sidebar records="active" />
        </div>
        <div className="table-container">
          <div className="table-wrapper">
            <header>
              <h2> All Records</h2>
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
                      setShowRecordSearch(true);
                    }}
                  >
                    Search
                  </button>
                </div>
                {/* date */}
                <div className="filter-date">
                  {/* <!-- date from --> */}
                  <div className="date-from">
                    <label htmlFor="date-from" className="date-label">
                      Date From:
                    </label>
                    <input type="date" className="date-from date" />
                  </div>
                  {/* <!-- date to --> */}

                  <div className="date-to">
                    <label htmlFor="date-to" className="date-label">
                      Date To:
                    </label>
                    <input type="date" className="date-to date" />
                  </div>
                  {/* <button type="button">Filter</button> */}
                </div>
              </div>
            </header>
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th id="bookID">ISBN</th>
                    <th>Book Title</th>
                    <th>Student ID</th>
                    <th>Student name</th>
                    <th>Email</th>
                    <th>Issue Date</th>
                    <th>Return Date</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {recordList.length > 0 && !showRecordSearch ? (
                    recordList
                  ) : showRecordSearch ? (
                    recordSearch
                  ) : (
                    <tr>
                      <td>NO AVAILABLE BOOKS</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Records;
