import React, { useEffect, useState } from "react";
import Profile from "../../assets/user1.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../SweetAlert/SweetAlert";

export const AccountApplicants = () => {
  const [applicantList, setApplicantList] = useState("");

  useEffect(() => {
    let applicantCleanpUp = true;
    const url = `${process.env.REACT_APP_API_URL}/students/applicants`;

    axios.get(url).then((result) => {
      const applicants = result.data.map((props) => {
        return (
          <tr key={props.STUD_ID}>
            <td className="name-box">
              <img
                src={props.image.length > 0 ? props.image : Profile}
                alt=""
              />{" "}
              {props.name}
            </td>
            <td>{props.stud_no}</td>
            <td>{props.section}</td>
            <td>{props.course}</td>
            <td className="email-box">{props.email}</td>
            <td className="action">
              <button
                type=""
                id="accept"
                onClick={(e) => {
                  e.preventDefault();
                  const url = `${process.env.REACT_APP_API_URL}/students/accept/${props.STUD_ID}`;

                  Swal.fire({
                    title: "Are you sure you want to accept this person?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Accept this person!",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      axios
                        .put(url)
                        .then((result) => {
                          Toast.fire({
                            icon: "success",
                            title: result.data.message,
                          });
                        })
                        .catch((err) => {
                          Toast.fire({
                            icon: "error",
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
                        });
                    }
                  });
                }}
              >
                Accept
              </button>
              <button
                id="reject"
                onClick={async (e) => {
                  e.preventDefault();
                  const url = `${process.env.REACT_APP_API_URL}/students/reject/${props.STUD_ID}`;

                  await Swal.fire({
                    title: "Are you sure you want to reject this person?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Reject this person!",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      axios
                        .delete(url)
                        .then((result) => {
                          Toast.fire({
                            icon: "success",
                            title: result.data.message,
                          });
                        })
                        .catch((err) => {
                          Toast.fire({
                            icon: "error",
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
                        });
                    }
                  });
                }}
              >
                Reject
              </button>
            </td>
          </tr>
        );
      });
      setApplicantList(applicants);
    });
    return () => {
      applicantCleanpUp = false;
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Student name</th>
          <th>Student I.D.</th>
          <th>Section</th>
          <th>Course</th>
          <th>Email</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {applicantList.length > 0 ? (
          applicantList
        ) : (
          <tr>
            <td>NO APPLICANTS</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
