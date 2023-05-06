import React, { useState, useEffect } from "react";
// import "../Css/Navbar.css";
import "../../Styles/Navbar.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/svccLogo.png";
import Profile from "../../assets/user.png";
import axios from "axios";

// icons
import { MdMenu } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { TbBooks } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

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
              <img src={Profile} alt="" />
              <h3>System-Admin</h3>
            </div>
            <ul>
              <li>
                <TbBooks className="icons" />
                <Link to="/system-admin/Booklist">Book List</Link>
              </li>

              <li>
                <BsPeople className="icons" />
                <Link to="/system-admin/Accountlist">Accounts</Link>
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
