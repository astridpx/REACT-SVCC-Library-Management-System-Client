import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import "../Css/Sidebar.css";
import "../../Styles/Sidebar.scss";
import Profile from "../../assets/user.png";
import axios from "axios";

// icons

import { TbBooks } from "react-icons/tb";

import { BsPeople } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

// REDUX
import { useSelector, useDispatch } from "react-redux";

const Sidebar = (props) => {
  const navigate = useNavigate();

  // REDUX VALUES
  const name = useSelector((state) => state.userAcc.name);
  const profileImg = useSelector((state) => state.userAcc.profileImg);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    let userCleanUp = true;

    return () => (userCleanUp = false);
  }, []);

  return (
    <>
      <div className="sidebar-container">
        <div className="line"></div>
        <div className="profile-box">
          <div className="image-box">
            <img src={Profile} alt="profile" />
          </div>
          <h3>Admin</h3>
        </div>
        <div className="sidebar">
          <ul>
            <li>
              <TbBooks className="icons" id={props.books} />
              <Link to="/system-admin/Booklist" id={props.books}>
                Book List
              </Link>
            </li>

            <li>
              <BsPeople className="icons" id={props.account} />
              <Link to="/system-admin/Accountlist" id={props.account}>
                Accounts
              </Link>
            </li>
            {/* <li>
              <RiAccountCircleLine className="icons" id={props.profile} />
              <Link to="/Profile" id={props.profile}>
                Profile
              </Link>
            </li> */}
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
