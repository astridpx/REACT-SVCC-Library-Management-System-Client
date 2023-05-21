import { useEffect, useRef, useState } from "react";
import "../../../Styles/Student.SignUp.scss";
import StudentLogo from "../../../assets/student.svg";
import Student from "../../../assets/student-Big-Img.svg";
import { FaLessThan } from "react-icons/fa";
import BtnBack from "../../../assets/Arrow-back.svg";
import { FormatStudID } from "../../../helpers/studID.format";
import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../../../components/SweetAlert/SweetAlert";
import SpinnerLoader from "../../../components/Api-Loader/Spinner";
import Loader from "../../../components/Api-Loader/LoadingDark";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../Redux/SignUpForm-Redux/signUpSlice";

const StudentRegister = () => {
  const [studId, setStudId] = useState("");
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const InputRef = useRef();

  // REDUX DISPATCH
  const dispatch = useDispatch();

  useEffect(() => {
    InputRef.current.focus();
  }, []);

  // FORNATING STUD ID
  const handleStudId = (e) => {
    const formatedStudID = FormatStudID(e.target.value);
    setStudId("AY" + formatedStudID);
  };

  const HandleSubmitSignUp = async (e) => {
    e.preventDefault();
    setLoader(true);

    const dataConfig = {
      url: `${process.env.REACT_APP_API_URL}/students/register`,
      method: "post",
      data: {
        name,
        stud_no: studId,
        course,
        section,
        email,
        cpassword,
        password,
      },
    };

    await axios(dataConfig)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        }).then(() => dispatch(update({ signUpShowValue: false })));
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

  return (
    <>
      <div className="signUp-wrapper">
        <div className="signUp-LeftBox">
          <div className="studentImg-wrap">
            <img src={Student} alt="Student" className="studentBigImg" />
          </div>
          <div className="student-text">
            <h2>Let's go get you set up</h2>
            <p>
              It should only take a couple of minutes to create your account.
            </p>
            {/* BACK TO SIGN IN BUTTON */}
            <button
              className="btn-backSignIn"
              onClick={() => dispatch(update({ signUpShowValue: false }))}
            >
              <span>
                <FaLessThan id="arrow" />
              </span>
              Back to Sign In
            </button>
          </div>
        </div>
        <div className="signUp-rightBox">
          <header className="header-signUp">
            <img
              src={BtnBack}
              alt="Arrow back"
              id="btn-bck"
              onClick={() => dispatch(update({ signUpShowValue: false }))}
            />
            <img src={StudentLogo} alt="student Logo" className="studentLogo" />
            <h3>Sign Up as Student</h3>
            {loader && <Loader />}
          </header>

          <form
            action=""
            className="signUp-Form"
            onSubmit={(e) => HandleSubmitSignUp(e)}
          >
            <div className="signUp-input">
              <label htmlFor="id">I.D.</label>
              <input
                type="text"
                name="id"
                ref={InputRef}
                placeholder="Enter your I.D."
                autoComplete="off"
                required
                value={studId}
                onChange={(e) => handleStudId(e)}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                autoComplete="off"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="section">Section</label>
              <input
                type="text"
                name="section"
                required
                placeholder="Enter your section"
                autoComplete="off"
                value={section}
                onChange={(e) => setSection(e.target.value.toUpperCase())}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                placeholder="Enter your year"
                autoComplete="off"
                required
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="course">Course</label>
              <input
                type="text"
                name="course"
                required
                placeholder="Enter your course"
                autoComplete="off"
                value={course}
                onChange={(e) => setCourse(e.target.value.toUpperCase())}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                required
                placeholder="Enter your mobile"
                autoComplete="off"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signUp-input">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Confirm your password"
                autoComplete="off"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            <div className="signUp-btn-wrap">
              <button type="submit" className="signUp-btn" disabled={loader}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
