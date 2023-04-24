import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../../../components/SweetAlert/SweetAlert";
import Loader from "../../../components/Api-Loader/Loading";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../Redux/SignUpForm-Redux/signUpSlice";

const Studentform = ({ AdminStudentloginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  // SHOW HIDE PASSWORD FUNCTION
  const ShowHidePassword = () => {
    setShowHide(!showHide);
  };

  // REDUX DISPATCH
  const dispatch = useDispatch();

  const HandleSUbmitStudentLogin = async (e) => {
    e.preventDefault();
    setLoader(true);

    const dataConfig = {
      url: `${process.env.REACT_APP_API_URL}/students/login`,
      method: "post",
      data: {
        email,
        password,
      },
    };

    await axios(dataConfig)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        })
          .then(() => {
            dispatch(update({ signUpShowValue: false }));
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("id", result.data.id);
            localStorage.setItem("role", result.data.role);
            localStorage.setItem("userEmail", result.data.email);
          })
          .then(() => navigate("/Student-records"));
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      })
      .finally(() => setLoader(false));
  };

  const HandleDropdown = (e) => {
    if (e.target.value === "admin") return AdminStudentloginForm(false);
  };

  return (
    <>
      <div className="student-form-wrapper">
        <header className="studentHead">
          <h2>Welcome To</h2>
          <h1>SVCC LIBRARY MANAGEMENT SYSTEM</h1>
          <p>Login to get the books that interest you.</p>
        </header>

        <div className="dropDown-wrapper">
          <select className="dropDown" onChange={HandleDropdown}>
            <option value="student">Student</option>
            <option value="admin"> Admin</option>
          </select>
        </div>

        <form
          action=""
          className="studentForm"
          onSubmit={(e) => HandleSUbmitStudentLogin(e)}
        >
          <div className="studInput">
            <label htmlFor="email">
              <FiUser id="icons" />
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="studInput">
            <label htmlFor="password">
              <AiOutlineLock id="icons" />
            </label>

            <input
              type={!showHide ? "password" : "text"}
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* SHOW / HIDE PASSWORD */}
            <label
              htmlFor="password"
              style={{ display: password.length > 0 ? "unset" : "none" }}
            >
              {!showHide ? (
                <AiOutlineEyeInvisible
                  id="eye-icon"
                  onClick={ShowHidePassword}
                />
              ) : (
                <AiOutlineEye id="eye-icon" onClick={ShowHidePassword} />
              )}
            </label>
          </div>

          <button type="submit" className="stud-signIn" disabled={loader}>
            {loader ? <Loader /> : "SIGN IN "}
          </button>
        </form>

        {/* footer */}
        <div className="formBottom">
          <p className="signUp-txt">
            Don't have an account yet?
            <span
              onClick={() => {
                // showSignUpForm(true);
                dispatch(update({ signUpShowValue: true }));
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Studentform;
