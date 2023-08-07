import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import HouseIcon from '@mui/icons-material/House';
import EditIcon from '@mui/icons-material/Edit';
import { MemberInterface } from "../../models/modelMember/IMember";
import { PrefixInterface } from "../../models/modelMember/IPrefix";
import { DeleteMember, GetPrefixByUID } from "./service/servicecus";
import { FormControl, Select, SelectChangeEvent } from "@mui/material";
import { GenderInterface } from "../../models/modelMember/IGender";



function ProfileCustomer() {
    const [member, setMember] = useState<MemberInterface>({});
    const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
    const [gender, setGender] = useState<GenderInterface[]>([]);

    let navigate = useNavigate();
    


    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof member;
      console.log(event.target.name);
      console.log(event.target.value);
      
      setMember({
        ...member,
        [name]: event.target.value,
      });
      console.log(member);
    };

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof member;
  
      const { value } = event.target;
  
      setMember({ ...member, [id]: value });
    };
    const Onclick = async (id: number) => {
      let res = await DeleteMember(id);
      if (res) {
        window.location.reload();
        localStorage.clear();
        window.location.href = "/";
      }
    }
    

    //-----------เริ่มดึงข้อมูล-----------//
//---------------------Department-------------------------------------
const getPrefix = async () => {
  const apiUrl = `http://localhost:8080/nametitles`;

  const requestOptions = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  //การกระทำ //json
  fetch(apiUrl, requestOptions)
    .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

    .then((res) => {
    //   console.log(res.data); //show ข้อมูล

      if (res.data) {
        setPrefix(res.data);
      } else {
        // console.log("else");
      }
    });
};
//---------------------Position-------------------------------------
const getGender = async () => {
  const apiUrl = `http://localhost:8080/customers/genders`;

  const requestOptions = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  //การกระทำ //json
  fetch(apiUrl, requestOptions)
    .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

    .then((res) => {
    //   console.log(res.data); //show ข้อมูล

      if (res.data) {
        setGender(res.data);
      } else {
        // console.log("else");
      }
    });
};

    const apiUrl = "http://localhost:8080";

  async function GetMember() {
    let uid = localStorage.getItem("id");
    const requestOptions = {
        method: "GET",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/customer/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
  
            if (res.data) {
                setMember(res.data);
                console.log(res.data);
            }else{
              return false
            }
        });
  }


  useEffect(() => {
    GetMember();
    getGender();
    getPrefix();
    // getNametitleByUID();
  }, []);

  console.log(member);

    return (
    <div>
        <Container maxWidth="sm" sx={{ marginTop: 6 }}>
    <Paper
      elevation={4}
      sx={{
        marginBottom: 2,
        marginTop: 2,
        padding: 1,
        paddingX: 2,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <h4 style={{ color: "#000000" }}>Profile</h4>
    </Paper>
    <form>
      <Paper
        variant="outlined"
        sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}
        
      >
        

        {/*=======================================(Title)===========================================================*/}
        <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>
                <Grid
                xs={12}
                md={8}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
                >
                <FormLabel
                id="demo-simple-select-helper-label"
                sx={{ marginRight: 6.5, fontSize: 17, paddingBottom: 2 }}
                >
                Title:
                </FormLabel>
                <FormControl fullWidth variant="outlined">
                <Select
                native
                disabled
                value={member.PrefixID+""}
                onChange={handleChange}
                inputProps={{
                  name: "Nametitle_ID",
                }}
              >
                {prefix.map((item: PrefixInterface) => (
                  <option value={item.ID}>{item.Prefix_Name}</option>
                ))}
              </Select>
                </FormControl>              
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                คำนำหน้าชื่อ
                </FormHelperText>
                </Grid>

                {/*============================================(First name)======================================================*/}
                <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Firstname</p>
                <TextField
                id="Fristname"
                disabled
                fullWidth
                required
                value={member.FirstName}
                />
                </Grid>
                {/*=============================================(Last name)=====================================================*/}
                <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Lastname</p>
                <TextField
                id="lastname"
                disabled
                fullWidth
                required
                value={member.LastName}
                />
                </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>
                {/*============================================(Age)======================================================*/}
                <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Age</p>
                <TextField
                id="Age"
                disabled              
                fullWidth
                required
                 value={member.Age}
                />
                </Grid>
                {/*=============================================(Phone)=====================================================*/}
                <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Phone number</p>
                <TextField
                id="Phone"
                disabled
                fullWidth
                required
                value={member.Phone}
                />
                </Grid>
                </Grid>


                {/*===========================================(email)=======================================================*/}
                <Grid container spacing={1}>
                <Grid
                xs={12}
                md={12}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
                >
                <FormLabel sx={{ marginRight: 7, fontSize: 17 }}>
                Email:
                </FormLabel>
                <TextField
                type="email"
                id="outlined-basic"
                disabled
                required
                fullWidth
                value={member.Email}
                />
                </Grid>
                
                {/*=======================================(select Gender)===========================================================*/}
                <Grid
                xs={12}
                md={9}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
                >
                <FormLabel
                id="demo-simple-select-helper-label"
                sx={{ marginRight: 5.5, fontSize: 17, paddingBottom: 2 }}
                >
                Gender:
                </FormLabel>
                <Select
                native
                disabled
                value={member.GenderID+""}
                onChange={handleChange}
                inputProps={{
                  name: "Nametitle_ID",
                }}
              >
                {gender.map((item: GenderInterface) => (
                  <option value={item.ID}>{item.G_Name}</option>
                ))}
              </Select>
                
                </Grid>

                {/*=======================================(Province)===========================================================*/}
                <Grid
                xs={12}
                >                
                </Grid>
            

          <Stack direction="row"  spacing={40} >

          <Button variant="contained" color="success" startIcon={<HouseIcon />} component={RouterLink} to="/home">
              Home
          </Button>

          <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(`/customer/edit`)} >
              Edit
          </Button>
         
        </Stack>
            
        </Grid></Paper></form></Container></div>
    )
        
    

}

export default ProfileCustomer;
