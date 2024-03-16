import { ServiceInterface } from "../../../models/IService";

const apiUrl = "http://localhost:8080";
// router.GET("/services", service.ListServices)
// router.GET("/service/:id", service.GetService)
// router.POST("/services", service.CreateService)
// router.PUT("/services", service.UpdateService)
// router.DELETE("/services/:id", service.DeleteService)
// List Room

const requestOptionsGet = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
}

async function GetPrice(id: number) {
    let res = await fetch(`${apiUrl}/services/${id}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data.Price;
            } else {
                return false;
            }
        });
    return res;
}
async function GetServiceType() {
    let res = await fetch(`${apiUrl}/services_types`, requestOptionsGet)
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
// List Room
async function GetService(id : number) {
    // const requestOptions = {
    //     method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "application/json",
    //       },
    // };

    let res = await fetch(`${apiUrl}/services/service_type/${id}`, requestOptionsGet)
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

async function GetTimeService(id : number) {
    let res = await fetch(`${apiUrl}/time_services/service/${id}`, requestOptionsGet)
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

// List Employee
async function GetEmployees() {
    const requestOptions = {
        method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
    };

    let res = await fetch(`${apiUrl}/Employees`, requestOptions)
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

// //Craete service
// async function CreateService(data: ServiceInterface) {
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };

//     let res = await fetch(`${apiUrl}/services`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//             if (res.data) {
//                 return {status: true, message: res.data};
//             } else {
//                 return {status: false, message: res.error};
//             }
//         });

//     return res;
// }

// //protected.PATCH("/services/id", service.Service)
// async function Service(data: number) {
//     let ServiceID = data;
//     const requestOptions = {
//         method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         body: JSON.stringify(data),
//     }

//     let res = await fetch(`${apiUrl}/services/${ServiceID}`, requestOptions)
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

// // Delete Service
// async function DeleteService(data: number) {
//     let ServiceID = data;
//     const requestOptions = {
//         method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         body: JSON.stringify(data),
//     }
    
//     let res = await fetch(`${apiUrl}/services/${ServiceID}`, requestOptions)
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

// //update room
// async function UpdateService(data: ServiceInterface) {
//     const requestOptions = {
//         method: "PUT",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         body: JSON.stringify(data),
//     }

//     let res = await fetch(`${apiUrl}/services`, requestOptions)
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


export {

    // CreateService,
    GetEmployees,
    // Service,
    // DeleteService,
    // UpdateService,
    GetService,

    GetServiceType,
    GetPrice,
    GetTimeService
};
