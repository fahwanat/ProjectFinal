import React, { Fragment, useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./components/Home";
import SignIn from "./components/Login";

import CreatMember from "./components/Member/CreatMember";
import ProfileMember from "./components/Member/ProfileMember";
import EditMember from "./components/Member/EditMember";
// import CustomerlistforAdmin from "./components/Customer/ShowCustomerforAdmin";
import Homepage from "./components/Homepage";
import Homeshow from "./components/Homeshow";
import About from "./components/About";
// import Roomhome from "./components/Roomhome";

export default function App() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setRole(localStorage.getItem("role") || "");
    }
  }, []);

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Homeshow" element={<Homeshow />} />
          <Route path="/About" element={<About />} />
          {/* <Route path="/Roomhome" element={<Roomhome />} /> */}
          {/* <Route path="/RW" element={<Review_Show />} /> */}
          <Route path="/home" element={<SignIn />} />
          <Route path="/member/create" element={<CreatMember />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      {token && (
        <Fragment>
          <Navbar />
          <Routes>
            {role === "Officer" && (
              <>
                <Route path="/home" element={<Home />} />
                {/* <Route path="/Manage-Save" element={<Manage_Save />} />
                <Route path="/Manage-Show" element={<Manage_Show />} />
                <Route path="/Manage-Edit/:id" element={<Manage_Edit />} /> */}
              </>
              )
            }
            {role === "Member" && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/member/profile" element={<ProfileMember />} /> 
                <Route path="/member/edit" element={<EditMember />} /> 
                {/* <Route path="/member/showforadmin" element={<MemberlistforAdmin />} /> */}
                </>
            )
            }

              {role === "Employee" && (
              <>
              <Route path="/home" element={<Home />} />

              {/* <Route path="/customer/showforadmin" element={<CustomerlistforAdmin />} />  */}
              </>
            )
            }
          </Routes>
        </Fragment>
      )
    }
    </Router>
  );
}
