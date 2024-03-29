// import "../../Css/ProfileEdit.css";
import "./ProfileEdit.scss";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../SweetAlert/SweetAlert";
import { FormatStudID } from "../../helpers/studID.format";

export const ProfileEdit = (props) => {
  const [accId, setAccId] = useState("");
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState([]);

  // FOCUS INPUT FIELD
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();

    const url = `${process.env.REACT_APP_API_URL}/admin`;

    axios
      .get(url)
      .then((result) => {
        result.data.map((value) => {
          setAccId(value.school_ID);
          setName(value.name);
          setSection(value.section);
          setCourse(value.course);
          setEmail(value.email);
          setPassword();
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAccId = (e) => {
    const formatedAccID = FormatStudID(e.target.value);
    setAccId("AY" + formatedAccID);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const configData = {
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/admin/update-admin/${props.adminId}`,
      data: {
        schoolId: accId,
        name,
        section,
        course,
        email,
        password,
      },
    };

    // console.log(configData);
    axios(configData)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        }).then(() => window.location.reload(false));
      })
      .catch((err) => {
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

  return (
    <>
      <form action="" onSubmit={(e) => HandleSubmit(e)}>
        <div className="input-field">
          <p>I.D.</p>
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter stud Id"
            required
            value={accId}
            onChange={(e) => handleAccId(e)}
          />
        </div>
        <div className="input-field">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <p>Role</p>
          <input
            type="text"
            placeholder="Enter name"
            defaultValue={"Librarian"}
            readOnly
          />
        </div>
        <div className="input-field">
          <p>Section</p>
          <input
            type="text"
            placeholder="Enter section"
            required
            value={section}
            onChange={(e) => setSection(e.target.value.toUpperCase())}
          />
        </div>
        <div className="input-field">
          <p>Course</p>
          <input
            type="text"
            placeholder="Enter course"
            required
            value={course}
            onChange={(e) => setCourse(e.target.value.toUpperCase())}
          />
        </div>
        <div className="input-field">
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <div className="input-field">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn-box">
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};
