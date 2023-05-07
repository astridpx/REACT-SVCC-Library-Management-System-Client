import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// ? Protected Routes
import PrivateRoutes from "./utils/PrivateRoutes";
import AdminRoutes from "./utils/AdminPrivateRoutes";
import SystemAdminPrivateRoutes from "./utils/SystemAdminPrivateRoutes";
import StudentRoutes from "./utils/StudentPrivateRoutes";

// pages
import Dashboard from "./pages/Dashboard";
import IssueBooks from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Book from "./pages/Books";
import AvailableBooks from "./pages/AvailableBooks";
import AllRecord from "./pages/Records";
import ExpireRecord from "./pages/Records-Expired";
// import Account from "./pages/Accounts";
import Profile from "./pages/Profile";

// STUDENT
import HomeStudent from "./STUDENT/Home";
import IssueStudent from "./STUDENT/IssueBook.student";
import ReturnBookStudent from "./STUDENT/ReturnBook.student";
import BooklistStudent from "./STUDENT/Booklist.student";
import StudentProfile from "./STUDENT/Myaccount.student";
import StudentRecords from "./STUDENT/Student.records";

// SYSTEM ADMIN
import Booklist from "./SYSTEM-ADMIN/BookList";
import Accountlist from "./SYSTEM-ADMIN/Accounts";

// LOGIN REGISTER
import Login from "./pages/Login-Register/Login";

function App() {
  const role = localStorage.getItem("role");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              exact
              element={
                role === "student" ? (
                  <StudentRecords />
                ) : role === "systemAdmin" ? (
                  <Booklist />
                ) : (
                  <Dashboard />
                )
              }
            />

            {/* STUDENT */}
            <Route element={<StudentRoutes />}>
              {/* <Route path="/student/home" exact element={<HomeStudent />} /> */}
              <Route
                path="/Student-records"
                exact
                element={<StudentRecords />}
              />
              <Route path="/student/issue" exact element={<IssueStudent />} />
              <Route
                path="/student/profile"
                exact
                element={<StudentProfile />}
              />
              <Route
                path="/student/booklist"
                exact
                element={<BooklistStudent />}
              />
            </Route>

            {/* ADMIN */}
            <Route element={<AdminRoutes />}>
              <Route path="/Dashboard" exact element={<Dashboard />} />
              <Route path="/Issue-Books" exact element={<IssueBooks />} />
              <Route path="/Return-Books" exact element={<ReturnBook />} />
              <Route path="/Books" exact element={<Book />} />
              <Route
                path="/Available-Books"
                exact
                element={<AvailableBooks />}
              />
              <Route path="/All-Records" exact element={<AllRecord />} />
              <Route
                path="/All-Records/Expired/:isExpired"
                exact
                element={<ExpireRecord />}
              />
              {/* <Route path="/Accounts" exact element={<Account />} /> */}
              <Route path="/Profile" exact element={<Profile />} />
            </Route>

            {/* SYSTEM ADMIN */}
            <Route element={<SystemAdminPrivateRoutes />}>
              <Route path="/system-admin/Booklist" element={<Booklist />} />
              <Route
                path="/system-admin/Accountlist"
                element={<Accountlist />}
              />
            </Route>
          </Route>

          {/* If token already exist it bring in the homepage */}
          {/* <Route element={<LoginTokenRoutes />}> */}
          <Route path="/Login" exact element={<Login />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
