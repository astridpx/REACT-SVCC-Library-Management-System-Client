import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.scss";

// COMPONENT FORM
import AdminForm from "./components/AdminForm.login";
import Studentform from "./components/StudentForm.login";
import StudentSignUp from "./components/Student.register";

// REDUX
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const showSignUpValue = useSelector(
    (state) => state.showHideSignUp.signUpShowValue
  );
  const [showForm, setShowForm] = useState("admin1");

  // SHOW HIDE ADMIN STUDENT LOGIN FORM
  const AdminStudentloginForm = (value) => {
    setShowForm(value);
  };

  useEffect(() => {
    const isToken = localStorage.getItem("token");

    if (isToken) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="loginContainer">
        <div className="login-overlay">
          <div className="login-wrapper">
            {!!showSignUpValue ? (
              <StudentSignUp />
            ) : (
              <div className="loginform-wrapper">
                {/* FORMS */}
                {showForm === "student" ? (
                  <Studentform AdminStudentloginForm={AdminStudentloginForm} />
                ) : (
                  <AdminForm AdminStudentloginForm={AdminStudentloginForm} />
                )}

                {/* <div className="login-rightBox"></div> */}
                <aside className="loginRightBox">
                  <div className="overlay">
                    <h3>St. Vincent College of Cabuyao</h3>
                    <h1>Truth Knowledge Service</h1>
                    {/* <p>SVCC&copy;2022</p> */}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
