import React, { useEffect, useState } from "react";
import Profile from "../../assets/user1.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../SweetAlert/SweetAlert";

// REDUX
import { useSelector } from "react-redux";

export const AccountList = () => {
  const email = useSelector((state) => state.userAcc.email);
  // const profile = useSelector((state) => state.userAcc.profileImg);
  const [accountList, setAccountList] = useState("");

  useEffect(() => {
    let accListCleanup = true;
    const url = `${process.env.REACT_APP_API_URL}/students/`;

    axios.get(url).then((result) => {
      const acclist = result.data.map((props) => {
        return (
          <tr key={props.STUD_ID}>
            <td className="name-box">
              <img
                src={props.image.length > 0 ? props.image : Profile}
                alt=""
              />
              {props.name}
            </td>
            <td>{props.stud_no}</td>
            <td>{props.section}</td>
            <td>{props.course}</td>
            <td className="email-box">{props.email}</td>
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
                        url: `${process.env.REACT_APP_API_URL}/students/disband/${props.STUD_ID}`,
                        data: {
                          email,
                          password: confirmPassword.value,
                        },
                      };
                      axios(configData)
                        .then((result) => {
                          Toast.fire({
                            icon: "success",
                            title: result.data.message,
                          });
                          // .then(() => window.location.reload(false));
                        })
                        .catch((err) => {
                          if (err) {
                            Toast.fire({
                              icon: "error",
                              showCancelButton: false,
                              title: err.response.data.message,
                              didOpen: (toast) => {
                                toast.addEventListener(
                                  "mouseenter",
                                  Swal.stopTimer
                                );
                                toast.addEventListener(
                                  "mouseleave",
                                  Swal.resumeTimer
                                );
                              },
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
      setAccountList(acclist);
    });

    return () => (accListCleanup = false);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Student name</th>
          <th>Studend I.D.</th>
          <th>Section</th>
          <th>Course</th>
          <th>Email</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {accountList.length > 0 ? (
          accountList
        ) : (
          <tr>
            <td>NO MEMBER YET</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
