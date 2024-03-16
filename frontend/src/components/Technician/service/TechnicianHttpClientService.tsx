import { EmployeeInterface } from "../../../models/IManage";
            
            
            const apiUrl = "http://localhost:8080";
            const requestOptionsGet = {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              };

            async function GetEmployeeByUID() {
                let uid = localStorage.getItem('id');
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            
                let res = await fetch(`${apiUrl}/employee/${uid}`, requestOptions)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            return res.data;
                        } else {
                            return false;
                        }
                    });
            
                return res;
            };
            const GetEmployeeByID = async (uid: string) => {
                let res = await fetch(`${apiUrl}/employee/${uid}`, requestOptionsGet)
                  .then((response) => response.json())
                  .then((result) => {
                    return result.data ? result.data : false;
                  });
              
                return res;
              };

              async function Employees(data: EmployeeInterface) {
                const requestOptions = {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                };
            
                let res = await fetch(`${apiUrl}/employees`, requestOptions)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            return { status: true, message: res.data };
                        } else {
                            console.log(res.error);
                            return { status: false, message: res.error };
                        }
                    });
            
                return res;
            }
            

            async function GetEmployeelist(param?: { tag?: string; sort?: number }) {
                const requestOptions = {
                    method: "GET",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                      },
                };
            
                let res = await fetch(`${apiUrl}/employees`, requestOptions)
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
            
            async function GetEmployeeBySID(id : number) {
                let res = await fetch(`${apiUrl}/employees/service_type/${id}`, requestOptionsGet)
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
            

            export{
                // GetPosition,
                GetEmployeeByUID,
                // UpdateEmployee,
                // DeleteEmployee,
                // GetPositionByUID,
                GetEmployeeByID,
                GetEmployeelist,
                Employees,
                GetEmployeeBySID,
            }

