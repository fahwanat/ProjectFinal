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
// import About from "./components/About";
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
          {/* <Route path="/About" element={<About />} /> */}
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
                {/* <Route path="/Book" element={<Bookings />} /> */}
                {/* <Route path="/Book/Create" element={<BookingCreate />} />
                <Route path="/Book/Edit" element={<BookingUpdate />} />
                <Route path="/Book/Delete" element={<BookingDelete />} /> */}

                {/* <Route path="/Rep" element={<RepRqShow />} />
                <Route path="/Rep/Create" element={<RepRqCreate />} />
                <Route path="/Rep/Edit/:id" element={<RepRqEdit />} /> */}


                {/* <Route path="/Reviewlist" element={<Review_list />} /> */}

                {/* <Route path="/ss" element={<ServiceShow />} />
                <Route path="/sa" element={<ServiceAdd />} />
                <Route path="/su/:id" element={<ServiceUpdate />} />
                <Route path="/sd" element={<ServiceDelete />} /> */}

                {/* <Route path="/ps" element={<PaymentShow />} />
                <Route path="/pai" element={<PaymentAddIn />} />
                <Route path="/pao" element={<PaymentAddOut />} />
                <Route path="/pu/:id" element={<PaymentUpdate />} /> */}

                
                <Route path="/member/profile" element={<ProfileMember />} /> 
                <Route path="/member/edit" element={<EditMember />} /> 
                {/* <Route path="/member/showforadmin" element={<MemberlistforAdmin />} /> */}
                </>
            )
            }

              {role === "Employee" && (
              <>
              <Route path="/home" element={<Home />} />
              
              {/* <Route path="/RT" element={<RoomShow />} />
              <Route path="/RT/Create" element={<RoomCreate />} />
              <Route path="/RT/Edit" element={<RoomEdit />} />

              <Route path="/CPM" element={<CHK_Payments />} />
              <Route path="/CPM/Create" element={<CHK_PaymentCreate />} />
              <Route path="/CPM/Edit" element={<CHK_PaymentUpdate />} />

              <Route path="/RoomW" element={<StorageShow />} />
              <Route path="/RoomW/Create" element={<StorageCreate />} />
              <Route path="/RoomW/Edit" element={<StorageEdit />} />

              <Route path="/CNCO" element={<CheckInOutShow />} />
              <Route path="/CNCO/Create" element={<CheckInOutCreate />}/> 
              <Route path="/CNCO/Edit/:id" element={<CheckInOutEdit />}/> 

              <Route path="/checkroom/create" element={<Checkroom />} />
              <Route path="/checkroom/list" element={<Checkroomlist />} />
              <Route path="/checkroom/edit" element={<CheckroomEdit />} />

              <Route path="/customer/showforadmin" element={<CustomerlistforAdmin />} /> */}
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
