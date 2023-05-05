import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../../../components/SweetAlert/SweetAlert";
import Loader from "../../../components/Api-Loader/Loading";

import { FiUser } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const AdminForm = ({ AdminStudentloginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  // SHOW HIDE PASSWORD FUNCTION
  const ShowHidePassword = () => {
    setShowHide(!showHide);
  };

  const HandleSubmitAdminLogin = async (e) => {
    e.preventDefault();
    // setLoader(true);
    // axios.defaults.withCredentials = true;
    const dataConfig = {
      url: `${process.env.REACT_APP_API_URL}/admin/adminLogin`,
      method: "POST",
      data: {
        email,
        password,
      },
    };

    await axios(dataConfig)
      .then((result) => {
        console.log(result);
        Toast.fire({
          icon: "success",
          title: result.data.message,
        })
          .then(() => {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userEmail", result.data.email);
            localStorage.setItem("role", result.data.role);
          })
          .then(() => navigate("/"));
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
      });
    // .finally(() => setLoader(false));
  };

  const HandleDropdown = (e) => {
    if (e.target.value === "student") return AdminStudentloginForm(true);
  };

  return (
    <>
      <form
        action=""
        className="adminAnimate"
        onSubmit={(e) => HandleSubmitAdminLogin(e)}
      >
        <header className="loginHead">
          <h2>Welcome To</h2>
          <h1>SVCC LIBRARY MANAGEMENT SYSTEM</h1>
          <p>Login to get the books that interest you.</p>
        </header>

        <div className="dropDown-wrapper">
          <select className="dropDown" onChange={HandleDropdown}>
            <option value="admin"> Admin</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div className="formField">
          <div className="inputField">
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

          <div className="inputField">
            <label htmlFor="password">
              <AiOutlineLock id="icons" />
            </label>

            <input
              type={!showHide ? "password" : "text"}
              name="password"
              placeholder="Password"
              autoComplete="off"
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
          <div className="inputField">
            <button type="submit" className="btn-signIn" disabled={loader}>
              {/* {loader ? <Loader /> : "SIGN IN"} */}
              SIGN IN
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminForm;
