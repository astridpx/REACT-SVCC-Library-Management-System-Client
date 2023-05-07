import React, { useState, useEffect } from "react";
// import "../Css/Navbar.css";
import "../../Styles/Navbar.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/svccLogo.png";
import axios from "axios";

// icons
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiBookBookmark } from "react-icons/bi";
import { TbBooks } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { BiBookAlt } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { GiBlackBook } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";

// REDUX
import { useSelector } from "react-redux";

const Navbar = () => {
  const [show, setShow] = useState("none");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    let isMount = true;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/token/${token}`,
    })
      .then((result) => {
        !result.data.isValid && handleLogout();
      })
      .catch((err) => console.log(err));

    return () => (isMount = false);
  }, []);

  const profileImg = useSelector((state) => state.userAcc.profileImg);
  const name = useSelector((state) => state.userAcc.name);

  return (
    <>
      <div className="navbar">
        <nav>
          <div className="logo">
            <img src={Logo} alt="Logo" />
            <h2>St. Vincent College </h2>
          </div>
          <MdMenu id="menu" onClick={() => setShow("block")} />
          <div
            className="overlay"
            style={{ display: show }}
            onClick={() => setShow("none")}
          ></div>
          <div className="navlinks" style={{ display: show }}>
            {/* <AiOutlineClose id="menu-close" /> */}
            <div className="profile">
              <img src={profileImg} alt="" />
              <h3>{name}</h3>
            </div>
            <ul>
              <li>
                <HiOutlineDocumentReport className="icons" />
                <Link to="/Student-records">My Records</Link>
              </li>
              <li>
                <BiBookBookmark className="icons" />
                <Link to="/student/issue">Issue Book</Link>
              </li>
              {/* <li>
                <GiBlackBook className="icons" />
                <Link to="/student/return">Return Book</Link>
              </li> */}
              <li>
                <BiBookAlt className="icons" />
                <Link to="/student/booklist">Booklist</Link>
              </li>

              <li>
                <RiAccountCircleLine className="icons" />
                <Link to="/student/profile">Profile</Link>
              </li>
              <li>
                <BiLogOut className="icons" onClick={handleLogout} />
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
