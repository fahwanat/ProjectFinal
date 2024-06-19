import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import HouseIcon from "@mui/icons-material/House";
import EditIcon from "@mui/icons-material/Edit";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link, Link as RouterLink } from "react-router-dom";
import { MemberInterface } from "../../models/modelMember/IMember";
import { PrefixInterface } from "../../models/modelMember/IPrefix";
import { GetMemberByUID, UpdateMember } from "./service/servicecus";
import {
  Box,
  FormControl,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
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
    });
  };

  const handleInputAge = (
    event: React.ChangeEvent<{ id?: string; value: unknown }>
  ) => {
    const id = event.target.id as keyof typeof member;
    const { value } = event.target;
    setMember({
      ...member,
      [id]: value === "" ? "" : Number(value),
    });
  };

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
      Line: member.Line,
      Password: member.Password,
    };
    console.log(newdata);
    console.log(JSON.stringify(newdata));
    let res = await UpdateMember(newdata);
    if (res) {
      setSuccess(true);
      console.log(newdata);
      setInterval(() => {
        window.location.assign("/member/profile");
      }, 1000);
    } else {
      setError(true);
    }
    console.log(JSON.stringify(newdata));
  }

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
      <Container
        maxWidth="xl"
        sx={{
          height: "91.35vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}
      >
        <Container maxWidth="md" sx={{ marginBottom: 5 }}>
          <Box flexGrow={1} sx={{ marginTop: 3 }} textAlign={"center"}>
            <Typography
              component="h2"
              variant="h6"
              gutterBottom
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              ส่วนตัวของคุณ {member.FirstName}
            </Typography>
          </Box>

          <form>
            <Paper
              variant="outlined"
              sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}
            >
              {/*=======================================(Title)===========================================================*/}
              <Grid container spacing={2} sx={{ marginBottom: 1.5 , marginTop:2}}>
                <Grid xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>คำนำหน้า</p>
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
                </Grid>

                {/*============================================(First name)======================================================*/}
                <Grid xs={6} md={6}>
                  <p>ชื่อ</p>
                    <TextField
                      id="FirstName"
                      variant="outlined"
                      type="string"
                      fullWidth
                      value={member.FirstName || ""}
                      onChange={handleInputChange}
                    />
                </Grid>

                {/*=============================================(Last name)=====================================================*/}
                <Grid xs={6} md={6}>
                  <p>นามสกุล</p>
                    <TextField
                      id="LastName"
                      variant="outlined"
                      type="string"
                      fullWidth
                      value={member.LastName || ""}
                      onChange={handleInputChange}
                    />
                </Grid>

                {/*=============================================(Nickame)=====================================================*/}
                <Grid xs={6} md={6}>
                  <p>นามสกุล</p>
                    <TextField
                      id="Nickname"
                      variant="outlined"
                      type="string"
                      fullWidth
                      value={member.Nickname || ""}
                      onChange={handleInputChange}
                    />                 
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>
                {/*============================================(Age)======================================================*/}
                <Grid xs={6} md={6}>
                  <p>อายุ</p>
                    <TextField
                      id="Age"
                      fullWidth
                      value={member.Age}
                      onChange={handleInputAge}
                    />
                </Grid>
                {/*=============================================(Phone)=====================================================*/}
                <Grid xs={6} md={6}>
                <p>เบอร์มือถือ</p>
                    <TextField
                      id="Phone"
                      variant="outlined"
                      type="string"
                      fullWidth
                      value={member.Phone || ""}
                      onChange={handleInputChange}
                    />
                </Grid>
              </Grid>

              {/*===========================================(email)=======================================================*/}
              <Grid container spacing={1}>
                <Grid xs={6} md={6}>
                  <p>ไอดีไลน์</p>
                    <TextField
                      id="Line"
                      variant="outlined"
                      type="string"
                      fullWidth
                      value={member.Line || ""}
                      onChange={handleInputChange}
                    />
                </Grid>

                {/*=======================================(select Gender)===========================================================*/}
                <Grid xs={6} md={6}>
                <p>เพศ</p>
                  <Select
                    id="GenderID"
                    native
                    fullWidth
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

                <Stack direction="row" spacing={69} sx={{ marginTop: 2 }}>
                  <Link to="/member/profile" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<HouseIcon />}
                      style={{ backgroundColor: "#009933", color: "#fff" }}
                    >
                      กลับ
                    </Button>
                  </Link>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<EditIcon />}
                    onClick={update}
                    style={{ backgroundColor: "#1976d2", color: "#fff" }}
                  >
                    บันทึกการแก้ไข
                  </Button>
                </Stack>
              </Grid>
            </Paper>
          </form>
        </Container>
      </Container>
    </div>
  );
}

export default EditMember;
