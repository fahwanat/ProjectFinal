import { BookingsInterface } from "../../../models/modelBooking/IBooking";


const apiUrl = "http://localhost:8080";

async function GetMemberByUID() {
    let uid = localStorage.getItem('id');
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }

    let res = await fetch(`${apiUrl}/member/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}


async function GetMembers() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }

    let res = await fetch(`${apiUrl}/members`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetEmployeeByUID() {
    let uid = localStorage.getItem('id');
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }

    let res = await fetch(`${apiUrl}/member/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//List Booking
async function GetBookings() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/bookings`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//Get Booking
async function GetBooking(data: string | undefined) {
    let b_id = data;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/booking/${b_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//***List Booking by user ID***
async function GetBookingsBYUID() {
    let uid = localStorage.getItem('id');
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/bookings/member/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//***List Booking Total by customerID**
async function GetBookingsSumTotal() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/bookingtotalgroupbydate`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//Craete Bookings
async function Bookings(data: BookingsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/bookings`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return { status: true, message: res.data };
            } else {
                return { status: false, message: res.error };
            }
        });

    return res;
}

// Delete Booking
async function DeleteBooking(data: BookingsInterface) {
    let booking_number = data.Booking_Number;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/bookings/${booking_number}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return { status: true, message: res.data };
            } else {
                return { status: false, message: res.error };
            }
        });

    return res;
}

// Update Booking
async function UppdateBooking(data: BookingsInterface) {
    let b_id = data.ID;
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/bookings/${b_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return { status: true, message: res.data };
            } else {
                return { status: false, message: res.error };
            }
        });

    return res;
}

async function GetBookedTimeServices(data: BookingsInterface) {
    let t_id = data.ID;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/booked_time_services/${t_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });
    return res;
}

// Delete Booking
// In services/BookingHttpClientService.ts (or wherever you define your service functions)
async function DeleteBookingConfirm(id: number): Promise<{ status: boolean }> {
    const apiUrl = `http://localhost:8080/Bookings/${id}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(apiUrl, requestOptions);
    if (response.ok) {
        return { status: true };
    } else {
        return { status: false };
    }
}


// Delete Bookings
async function deleteBookings (id: number) {
    const apiUrl = "http://localhost:8080/Bookings/" + id;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

export {
    GetMemberByUID,
    GetMembers,

    GetEmployeeByUID,
    // GetEmployees,

    Bookings,
    GetBookings,
    GetBooking,
    GetBookingsBYUID, //****Special get */
    GetBookingsSumTotal,
    DeleteBooking,
    UppdateBooking,
    GetBookedTimeServices,
    DeleteBookingConfirm,
    deleteBookings

};