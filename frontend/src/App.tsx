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
import Manage_Save from "./components/Manage/Manage_Save";
import Manage_Show from "./components/Manage/Manage_Show";
import Manage_Edit from "./components/Manage/Manage_Edit";
import Bookings from "./components/Booking/Bookings";
import BookingCreate from "./components/Booking/BookingCreate";
// import BookingUpdate from "./components/Booking/BookingUpdate";
// import ServiceShow from "./components/Service/ServiceShow";

// import About from "./components/About";
import About from "./components/About";
import TechnicianBooking from "./components/Technician/TechnicianBooking";
import BookingAppointment from "./components/Booking/BookingApppointment";
import TechnicianAppointment from "./components/Technician/TechnicianAppointment";
import BookingConfirm from "./components/Booking/BookingConfirm";
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
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/member/create" element={<CreatMember />} />
          <Route path="/Book" element={<Bookings />} />
          <Route path="/Book/Create" element={<BookingCreate />} />
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
                <Route path="/Homeshow" element={<Home />} />
                 <Route path="/Manage-Save" element={<Manage_Save />} />
                <Route path="/Manage-Show" element={<Manage_Show />} />
                <Route path="/Manage-Edit/:id" element={<Manage_Edit />} />
                <Route path="/Book" element={<Bookings />} /> 
                {/* <Route path="/ss" element={<ServiceShow />} /> */}
              </>
              )
            }
            {role === "Member" && (
              <>
                <Route path="/Homeshow" element={<Home />} />
                <Route path="/TechnicianBooking" element={<TechnicianBooking />} /> 
                <Route path="/TechnicianAppointment" element={<TechnicianAppointment />} /> 
                <Route path="/Book/Create" element={<BookingCreate />} />
                <Route path="/Book/Appointment/:id" element={<BookingAppointment />} />
                <Route path="/BookConfirm/:id" element={<BookingConfirm />} />
                <Route path="/Book" element={<Bookings />} />
                {/* <Route path="/Book/Edit" element={<BookingUpdate />} /> */}
                {/*<Route path="/Book/Delete" element={<BookingDelete />} /> */}
                {/*<Route path="/Rep/Create" element={<RepRqCreate />} />
                <Route path="/Rep/Edit/:id" element={<RepRqEdit />} /> */}

                {/* <Route path="/Reviewlist" element={<Review_list />} /> */}

                 {/* <Route path="/ss" element={<ServiceShow />} /> */}
               {/*<Route path="/sa" element={<ServiceAdd />} />
                <Route path="/su/:id" element={<ServiceUpdate />} />
                <Route path="/sd" element={<ServiceDelete />} /> */}

                {/* <Route path="/ps" element={<PaymentShow />} />
                <Route path="/pai" element={<PaymentAddIn />} />
                <Route path="/pao" element={<PaymentAddOut />} />
                <Route path="/pu/:id" element={<PaymentUpdate />} /> */}

                
                <Route path="/home" element={<Home />} />
                <Route path="/member/profile" element={<ProfileMember />} /> 
                <Route path="/member/edit" element={<EditMember />} /> 
                {/* <Route path="/member/showforadmin" element={<MemberlistforAdmin />} /> */}
                </>
            )
            }

              {role === "Technician" && (
              <>
              <Route path="/Homeshow" element={<Home />} />
              <Route path="/Manage-Save" element={<Manage_Save />} />
                <Route path="/Manage-Show" element={<Manage_Show />} />
                <Route path="/Manage-Edit/:id" element={<Manage_Edit />} /> 
                <Route path="/Book" element={<Bookings />} />
                {/* <Route path="/ss" element={<ServiceShow />} />   */}
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
