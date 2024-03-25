import { PaymentsInterface } from "../../../models/IPayment";

const apiUrl = "http://localhost:8080";

const requestOptionsGet = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
}

// async function AddPayment(data: PaymentsInterface) {
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };

//     let res = await fetch(`${apiUrl}/payment`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//             if (res.data) {
//                 return { status: true, message: res.data };
//             } else {
//                 return { status: false, message: res.error };
//             }
//         });
//     return res;
// }

async function AddPayment(data: PaymentsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${apiUrl}/payment`, requestOptions);
        if (response.ok) {
            const resData = await response.json();
            if (resData.data) {
                return { status: true, message: resData.data };
            } else {
                return { status: false, message: resData.error };
            }
        } else {
            throw new Error('Failed to add payment');
        }
    } catch (error: any) {
        console.error('Error adding payment:', error);
        return { status: false, message: error.message };
    }
}

async function UpdatePayment(data: PaymentsInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/payments`, requestOptions)
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

// async function GetDestination(id: string) {
//     let res = await fetch(`${apiUrl}/method/${id}`, requestOptionsGet)
//         .then((response) => response.json())
//         .then((res) => {
//             if (res.data) {
//                 return res.data.Destination;
//             } else {
//                 return false;
//             }
//         });
//     return res;
// }

async function GetDestination(id: string) {
    try {
        const response = await fetch(`${apiUrl}/method/${id}`, requestOptionsGet);
        if (response.ok) {
            const resData = await response.json();
            if (resData.data) {
                return resData.data.Destination;
            } else {
                throw new Error('No destination found');
            }
        } else {
            throw new Error('Failed to fetch destination');
        }
    } catch (error) {
        console.error('Error getting destination:', error);
        return false;
    }
}

async function GetPaymentMethods() {
    try {
        const response = await fetch(`${apiUrl}/paymentmethods`, requestOptionsGet);
        if (response.ok) {
            const resData = await response.json();
            if (resData.data) {
                return resData.data;
            } else {
                console.error('No payment methods found');
                return false;
            }
        } else {
            throw new Error('Failed to fetch payment methods');
        }
    } catch (error) {
        console.error('Error getting payment methods:', error);
        return false;
    }
}

// async function GetPaymentMethods() {
//     let res = await fetch(`${apiUrl}/paymentmethods`, requestOptionsGet)
//         .then((response) => response.json())
//         .then((res) => {
//             if (res.data) {
//                 return res.data;
//             } else {
//                 return false;
//             }
//         });
//     return res;
// }

async function DeleteServices(id?: null | string) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${apiUrl}/services/member/${id}`, requestOptions)
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
async function DeleteBookings(id?: null | string) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${apiUrl}/bookings/member/${id}`, requestOptions)
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

async function GetMethods() {
    let res = await fetch(`${apiUrl}/methods`, requestOptionsGet)
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

async function GetPaymentByID(id?: string) {
    let res = await fetch(`${apiUrl}/payment/${id}`, requestOptionsGet)
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

async function GetPriceServiceCID(id?: string | null) {
    let res = await fetch(`${apiUrl}/priceservice/member/${id}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data.TotalAmount;
            } else {
                return false;
            }
        });
    return res;
}

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

async function GetPriceBookingCID(id?: string | null) {
    let res = await fetch(`${apiUrl}/pricebooking/member/${id}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data.TotalAmount;
            } else {
                return false;
            }
        });
    return res;
}

async function GetMember(id?: string | null) {
    let res = await fetch(`${apiUrl}/member/${id}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data.TotalAmount;
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

async function GetPayment(id: string) {
    let res = await fetch(`${apiUrl}/payment/member/${id}`, requestOptionsGet)
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


export {
    // AddPayment,
    UpdatePayment,
    GetPayment,
    GetDestination,
    GetPaymentMethods,
    GetMethods,
    GetPaymentByID,
    GetPriceServiceCID,
    DeleteServices,
    DeleteBookings,
    GetMembers,
    GetMember,
    GetMemberByUID,
    GetPriceBookingCID, AddPayment,
};