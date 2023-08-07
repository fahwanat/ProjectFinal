import { MemberInterface } from "../../../models/modelMember/IMember" 
            
            
            const apiUrl = "http://localhost:8080";
            const requestOptionsGet = {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              };

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
            };
            const GetMemberByID = async (uid: string) => {
                let res = await fetch(`${apiUrl}/member/${uid}`, requestOptionsGet)
                  .then((response) => response.json())
                  .then((result) => {
                    return result.data ? result.data : false;
                  });
              
                return res;
              };


            async function GetPrefixByUID(data: MemberInterface) {
                let nid = data.PrefixID;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            
                let res = await fetch(`${apiUrl}/member/prefixes/${nid}`, requestOptions)
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
            
            async function Members(data: MemberInterface) {
                const requestOptions = {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                };
            
                let res = await fetch(`${apiUrl}/members`, requestOptions)
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
            

            async function GetMemberlist() {
                const requestOptions = {
                    method: "GET",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                      },
                };
            
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
            
            
            async function DeleteMember(data: number) {
                let member= data;
                const requestOptions = {
                    method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(data),
                }
                
                let res = await fetch(`${apiUrl}/members/${member}`, requestOptions)
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

                // Update customer
                async function UpdateMember(data: MemberInterface) {
                    let mem_id = data.ID
                    const requestOptions = {
                        method: "PATCH",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                          },
                        body: JSON.stringify(data),
                    }
                
                    let res = await fetch(`${apiUrl}/membersupdate/${mem_id}`, requestOptions)
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
                

                async function GetPrefix() {
                    const requestOptions = {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    };
                
                    let res = await fetch(`${apiUrl}/prefixes`, requestOptions)
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
                    GetPrefix,
                    GetMemberByUID,
                    UpdateMember,
                    DeleteMember,
                    GetPrefixByUID,
                    GetMemberByID,
                    GetMemberlist,
                    Members,
                }