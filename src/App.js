import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";

// pages
import Dashboard from "./pages/Dashboard";
import IssueBooks from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Book from "./pages/Books";
import AvailableBooks from "./pages/AvailableBooks";
import AllRecord from "./pages/Records";
import Account from "./pages/Accounts";
import Profile from "./pages/Profile";

// STUDENT
import HomeStudent from "./STUDENT/Home";
import IssueStudent from "./STUDENT/IssueBook.student";
import ReturnBookStudent from "./STUDENT/ReturnBook.student";
import BooklistStudent from "./STUDENT/Booklist.student";
import StudentProfile from "./STUDENT/Myaccount.student";
import StudentRecords from "./STUDENT/Student.records";

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
              element={role === "student" ? <StudentRecords /> : <Dashboard />}
            />

            {/* STUDENT */}
            {/* <Route path="/student/home" exact element={<HomeStudent />} /> */}
            <Route path="/Student-records" exact element={<StudentRecords />} />
            <Route path="/student/issue" exact element={<IssueStudent />} />
            <Route path="/student/profile" exact element={<StudentProfile />} />
            {/* <Route
              path="/student/return"
              exact
              element={<ReturnBookStudent />}
            /> */}
            <Route
              path="/student/booklist"
              exact
              element={<BooklistStudent />}
            />

            {/* ADMIN */}
            <Route path="/Dashboard" exact element={<Dashboard />} />
            <Route path="/Issue-Books" exact element={<IssueBooks />} />
            <Route path="/Return-Books" exact element={<ReturnBook />} />
            <Route path="/Books" exact element={<Book />} />
            <Route path="/Available-Books" exact element={<AvailableBooks />} />
            <Route path="/All-Records" exact element={<AllRecord />} />
            <Route path="/Accounts" exact element={<Account />} />
            <Route path="/Profile" exact element={<Profile />} />
          </Route>

          <Route path="/Login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
