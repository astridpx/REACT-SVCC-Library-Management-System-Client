import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import "../Css/Sidebar.css";
import "../Styles/Sidebar.scss";
import Profile from "../assets/profile.png";
import axios from "axios";

// icons
import { BiHomeAlt } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiBookBookmark } from "react-icons/bi";
import { TbBooks } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { BiBookAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GiBlackBook } from "react-icons/gi";
import { MdPlayArrow } from "react-icons/md";
import { GoIssueOpened } from "react-icons/go";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  accIdValue,
  profileImg_src,
  updatename,
  updateEmail,
} from "../Redux/User/userSlice";
import {
  applicantReducer,
  booksReducer,
  issueReducer,
  memberReducer,
} from "../Redux/Dashboard-details/DashboardSlice";
import {
  D1reducer,
  D2reducer,
  D3reducer,
  D4reducer,
  D5reducer,
  D6reducer,
  D7reducer,
} from "../Redux/Dashboard-details/BargraphSlice";

const Sidebar = (props) => {
  let { isExpired } = useParams();
  const navigate = useNavigate();

  // REDUX VALUES
  const name = useSelector((state) => state.userAcc.name);
  const profileImg = useSelector((state) => state.userAcc.profileImg);
  const [img, setImg] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  // USER ACC NAME DISPATCH
  const dispatch = useDispatch();

  const dataConfig = {
    url: `${process.env.REACT_APP_API_URL}/admin`,
    method: "get",
  };
  const url_member = `${process.env.REACT_APP_API_URL}/students/`;
  const url_applicants = `${process.env.REACT_APP_API_URL}/students/stud/applicants`;
  const url_issue = `${process.env.REACT_APP_API_URL}/allRecords/`;
  const url_books = `${process.env.REACT_APP_API_URL}/books`;
  const url_bargraph = `${process.env.REACT_APP_API_URL}/graph`;

  useEffect(() => {
    let userCleanUp = true;

    axios(dataConfig)
      .then((result) => {
        result.data.map((props) => {
          dispatch(accIdValue({ accId: props.ADMIN_ID }));
          dispatch(updatename({ name: props.name }));
          dispatch(
            profileImg_src({
              profileImg: props.image,
            })
          );
          setImg(result.data[0].image);
          // dispatch(updateEmail({ email: props.email }));
          return true;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // MEMBER COUNT
    axios
      .get(url_member)
      .then((result) => {
        dispatch(memberReducer({ membersNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    // APPLICANTS COUNT
    axios
      .get(url_applicants)
      .then((result) => {
        dispatch(applicantReducer({ applicantsNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    // ISSUE COUNTS
    axios
      .get(url_issue)
      .then((result) => {
        dispatch(issueReducer({ issueNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    // BOOKS COUNTS
    axios
      .get(url_books)
      .then((result) => {
        dispatch(booksReducer({ booksNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    // Bargraph
    axios
      .get(url_bargraph)
      .then((result) => {
        result.data.map((days) => {
          dispatch(D1reducer({ D1: days.D1 }));
          dispatch(D2reducer({ D2: days.D2 }));
          dispatch(D3reducer({ D3: days.D3 }));
          dispatch(D4reducer({ D4: days.D4 }));
          dispatch(D5reducer({ D5: days.D5 }));
          dispatch(D6reducer({ D6: days.D6 }));
          dispatch(D7reducer({ D7: days.D7 }));
          return days;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (userCleanUp = false);
  }, []);

  return (
    <>
      <div className="sidebar-container">
        <div className="line"></div>
        <div className="profile-box">
          <div className="image-box">
            <img src={profileImg} alt="" />
          </div>
          <h3>{name}</h3>
        </div>
        <div className="sidebar">
          <ul>
            <li>
              <BiHomeAlt className="icons" id={props.dashboard} />
              <Link to="/Dashboard" id={props.dashboard}>
                Dashboard
              </Link>
            </li>
            <li>
              <BiBookBookmark className="icons" id={props.issue} />
              <Link to="/Issue-Books" id={props.issue}>
                Issue Book
              </Link>
            </li>
            <li>
              <GiBlackBook className="icons" id={props.return} />
              <Link to="/Return-Books" id={props.return}>
                Return Book
              </Link>
            </li>
            <li>
              <TbBooks className="icons" id={props.books} />
              <Link to="/Books" id={props.books}>
                Book List
              </Link>
            </li>
            <li>
              <BiBookAlt className="icons" id={props.availBook} />
              <Link to="/Available-Books" id={props.availBook}>
                Available Book
              </Link>
            </li>
            <li
              onClick={() => {
                setShowDropdown(!showDropdown);
                if (isExpired) navigate("/All-Records");
              }}
            >
              <TbReportSearch
                className="icons"
                id={props.records || isExpired ? "active" : null}
              />
              <Link
                to="/All-Records"
                id={props.records || isExpired ? "active" : null}
              >
                All Records
              </Link>
              <MdPlayArrow
                className={
                  showDropdown || isExpired
                    ? "dropdown-icon-open"
                    : "icons dropdown-icon"
                }
                id={props.records}
              />
            </li>
            <div
              className={
                showDropdown || isExpired ? "dropdown-open" : "dropdown"
              }
            >
              <li className="dropdown-item">
                <GoIssueOpened className="icons" id={props.expireRecord} />
                <Link
                  to={`/All-Records/Expired/${true}`}
                  id={props.expireRecord}
                >
                  Expired Record
                </Link>
              </li>
            </div>

            {/* <li>
              <BsPeople className="icons" id={props.account} />
              <Link to="/Accounts" id={props.account}>
                Accounts
              </Link>
            </li> */}
            <li>
              <RiAccountCircleLine className="icons" id={props.profile} />
              <Link to="/Profile" id={props.profile}>
                Profile
              </Link>
            </li>
            <li>
              <BiLogOut className="icons" onClick={handleLogout} />
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
