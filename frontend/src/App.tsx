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
import ManageShow from "./components/Manage/ManageShow";
import Manage_Edit from "./components/Manage/Manage_Edit";
import Bookings from "./components/Booking/Bookings";
// import BookingCreate from "./components/Booking/BookingCreate";
// import BookingUpdate from "./components/Booking/BookingUpdate";
// import ServiceShow from "./components/Service/ServiceShow";

// import About from "./components/About";
import About from "./components/About";
import TechnicianBooking from "./components/Technician/TechnicianBooking";
import BookingAppointment from "./components/Booking/BookingApppointment";
import TechnicianAppointment from "./components/Technician/TechnicianAppointment";
import BookingConfirm from "./components/Booking/BookingConfirm";
import PaymentCreate from "./components/Payment/PaymentCreate";
import Review from "./components/Review/Review";
import PaymentSave from "./components/Payment/PatmentSave";
import PaymentShow from "./components/Payment/PaymentShow";
import ServiceShow from "./components/Service/ServiceShow";
import Review_Show from "./components/Review/Review_Show";
import Review_list from "./components/Review/Review_list";
import CHK_Payments from "./components/CHK_Payment/CHK_Payment";
import CHK_PaymentCreate from "./components/CHK_Payment/CHK_PaymentCreate";
import CHK_PaymentUpdate from "./components/CHK_Payment/CHK_PaymentUpdate";
import Payment_Edit from "./components/Payment/Payment_Edit";
import Payment from "./components/Payment/Payment";
import PaymentCheck from "./components/Payment/PaymentCheck";
import ServiceCreate from "./components/Service/ServiceCreate";
import ServiceEdit from "./components/Service/ServiceEdit";
import BookingCreateNoTech from "./components/Booking/BookingCreateNoTech";                                          
import SelectService from "./components/Booking/SelectSevervice";
import SelectTechByHair from "./components/Technician/SelectTechByHair";
import SelectTechByFace from "./components/Technician/SelectTechByFace";
import SelectTechByNail from "./components/Technician/SelectTechByNail";
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
          {/* <Route path="/Book/Create" element={<BookingCreate />} /> */}
          <Route path="/Review" element={<Review />} />z
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
                <Route path="/ManageShow" element={<ManageShow />} />
                <Route path="/Manage-Edit/:id" element={<Manage_Edit />} />
                <Route path="/Book" element={<Bookings />} /> 
                <Route path="/Service" element={<ServiceShow />} />
                <Route path="/Service/Create" element={<ServiceCreate />} />
                <Route path="/Service/Edit" element={<ServiceEdit />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/Payment/:id" element={<Payment />} />
                <Route path="/Payment/Show" element={<PaymentShow />} />
                <Route path="/Payment/Create" element={<PaymentCreate />} />
                <Route path="/Payment-Edit/:id" element={<Payment_Edit />} />
                <Route path="/CheckPay" element={<PaymentCheck />} />
                <Route path="/CPM" element={<CHK_Payments />} />
                <Route path="/CPM/Create" element={<CHK_PaymentCreate />} />
                <Route path="/CPM/Edit" element={<CHK_PaymentUpdate />} />
              </>
              )
            }
            {role === "Member" && (
              <>
              <Route path="/Homeshow" element={<Home />} />
                {/* <Route path="/TechnicianBooking" element={<TechnicianBooking />} />  */}
                <Route path="/TechnicianAppointment" element={<TechnicianAppointment />} /> 
                <Route path="/SelectService" element={<SelectService />} />
                <Route path="/SelectTechByHair" element={<SelectTechByHair />} />
                <Route path="/SelectTechByNail" element={<SelectTechByNail />} />
                <Route path="/SelectTechByFace" element={<SelectTechByFace />} />
                <Route path="/Book/Appointment/:id" element={<BookingAppointment />} />
                <Route path="/BookConfirm" element={<BookingConfirm />} />
                <Route path="/Book" element={<Bookings />} />
                <Route path="/BookingCreateNoTech" element={<BookingCreateNoTech />} />
                <Route path="/home" element={<Home />} />
                <Route path="/member/profile" element={<ProfileMember />} /> 
                <Route path="/member/edit" element={<EditMember />} /> 

                <Route path="/TechnicianBooking" element={<TechnicianBooking />} /> 
                <Route path="/TechnicianAppointment" element={<TechnicianAppointment />} /> 
                {/* <Route path="/Book/Create" element={<BookingCreate />} /> */}
                <Route path="/Book/Appointment/:id" element={<BookingAppointment />} />
                <Route path="/BookConfirm/:id" element={<BookingConfirm />} />
                <Route path="/Book" element={<Bookings />} />
                {/* <Route path="/Book/Edit" element={<BookingUpdate />} /> */}
                {/*<Route path="/Book/Delete" element={<BookingDelete />} /> */}
                {/*<Route path="/Rep/Create" element={<RepRqCreate />} />
                <Route path="/Rep/Edit/:id" element={<RepRqEdit />} /> */}

                <Route path="/Review" element={<Review />} />
                <Route path="/AddReview" element={<Review_list />} />

                 {/* <Route path="/ss" element={<ServiceShow />} /> */}
               {/*<Route path="/sa" element={<ServiceAdd />} />
                <Route path="/su/:id" element={<ServiceUpdate />} />
                <Route path="/sd" element={<ServiceDelete />} /> */}

                <Route path="/Payment/Create" element={<PaymentCreate />} />
                <Route path="/Payment/Save" element={<PaymentSave />} />
                <Route path="/Payment/Show" element={<PaymentShow />} />
                <Route path="/Payment" element={<Payment />} />
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
                <Route path="/ManageShow" element={<ManageShow />} />
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
