import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link, Link as RouterLink } from "react-router-dom";
import { MemberInterface } from "../../models/modelMember/IMember";
import { PrefixInterface } from "../../models/modelMember/IPrefix";
import { GetMemberByUID,  UpdateMember } from "./service/servicecus";
import { FormControl, Select, SelectChangeEvent } from "@mui/material";
import { GenderInterface } from "../../models/modelMember/IGender";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function EditMember() {
  
  const [member, setMember] = useState<MemberInterface>({});
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  
  const handleChange = (event: SelectChangeEvent<number>) => { 
  const name = event.target.name as keyof typeof member;
    setMember({
      ...member,
      [name]: event.target.value,
    });
  };



  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: unknown }>
) => {
    const id = event.target.id as keyof typeof member;
    setMember({
        ...member,
        [id]: event.target.value,
    });};

    const handleInputAge = (
      event: React.ChangeEvent<{ id?: string; value: unknown }>
  ) => {
      const id = event.target.id as keyof typeof member;
      const { value } = event.target;
      setMember({
          ...member,
          [id]: value  === "" ? "" : Number(value)  
      });};
  

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      const name = event.target.name as keyof typeof member;
      setMember({
          ...member,
          [name]: event.target.value,
      });

  };


  // =========================(Fetch API)====================================================

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

  const fetchGender = async () => {
    fetch(`${apiUrl}/members/genders`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setGender(result.data);
      });
  };
  const fetchPrefix = async () => {
    fetch(`${apiUrl}/prefixes`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setPrefix(result.data);
      });
  };

  const fetchMember = async () => {
    let res = await GetMemberByUID();
    res && setMember(res);
  };

  useEffect(() => {
    fetchGender();
    fetchPrefix();
    fetchMember();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function update() {
    let newdata = {
      ID: convertType(member.ID),
      PrefixID: convertType(member.PrefixID),
      GenderID: convertType(member.GenderID),
      Firstname: member.FirstName,
      Lastname: member.LastName,
      Age: member.Age,
      Phone: member.Phone,
      Email: member.Email,
      Password: member.Password,
    };
    console.log(newdata);
    console.log(JSON.stringify(newdata))
    let res = await UpdateMember(newdata);
    if (res) {
      setSuccess(true);
      console.log(newdata)
      setInterval(() => {
        window.location.assign("/member/profile");
      }, 1000);
    } else {
      setError(true);
    }
    console.log(JSON.stringify(newdata))
  };


  return (
    <div>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
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
                    id="Nametitle_ID"
                    native
                    value={member.PrefixID}
                    onChange={handleChange}
                    inputProps={{
                      name: "PrefixID",
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
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="FirstName"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={member.FirstName || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>

              </Grid>

              {/*=============================================(Last name)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Lastname</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="LastName"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={member.LastName || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              {/*=============================================(Nickame)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Nickname</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Nickname"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={member.Nickname || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>
              {/*============================================(Age)======================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Age</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Age"
                    size="medium"
                    value={member.Age}
                    onChange={handleInputAge}
                  />
                </FormControl>
              </Grid>
              {/*=============================================(Phone)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Phone number</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Phone"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={member.Phone || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
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
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Email"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={member.Email || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
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
                  id="GenderID"
                  native
                  value={member.GenderID}
                  onChange={handleChange}
                  inputProps={{
                    name: "GenderID",
                  }}
                >
                  {gender.map((item: GenderInterface) => (
                    <option value={item.ID}>{item.G_Name}</option>
                  ))}
                </Select>

              </Grid>

              <Grid
                container
                xs={12}
                md={12}
                gap={2}
                sx={{ justifyContent: "center", margin: 1 }}
              >
                <Button variant="contained" size="large" onClick={update}>
                  บันทึกการแก้ไข
                </Button>

                <Link to="/member/profile" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "#fff", color: "#1976d2" }}
                  >
                    กลับ
                  </Button>
                </Link>
              </Grid>


            </Grid></Paper></form></Container></div>
  )



}

export default EditMember;