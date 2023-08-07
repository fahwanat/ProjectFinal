import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { MemberInterface } from "../../models/modelMember/IMember";
import { GenderInterface } from "../../models/modelMember/IGender";
import { PrefixInterface } from "../../models/modelMember/IPrefix";
import { Link } from "react-router-dom";
//import { Message } from "@mui/icons-material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Members } from "./service/servicecus";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreatMember() {
  // =========================(Use State)====================================================

  const [member, setMember] = useState<MemberInterface>({});
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = useState("");

  const [password, setPassword] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  // ==============================(handle password)=====================================

  interface State {
    password: string;
    showPassword: boolean;
  }

  const handlePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword({ ...password, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // =========================(handleClose)====================================================

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

  // =========================(HandleChange)====================================================

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

  useEffect(() => {
    fetchGender();
    fetchPrefix();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      FirstName: firstname,
      LastName: lastname,
      Nickname: nickname,
      Password: password.password,
      Email: email,
      Age: convertType(member.Age),
      Phone: phone,
      GenderID: convertType(member.GenderID),
      PrefixID: convertType(member.PrefixID),
      Signin: {
        Username: member.Email ?? "",
        Password: member.Password ?? "",
      }
    };
    let res = await Members(data);
    if (res.status) {
      setAlertMessage("บันทึกสำเร็จ");
      setSuccess(true);
      setInterval(() => {
        window.location.assign("/Homeshow");
      }, 1000);
    } else {
      console.log(res.message);
      setAlertMessage(res.message);
      setError(true);
    }
  }

  
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
          <h4 style={{ color: "#000000" }}>Sign Up</h4>
        </Paper>
        <form>
          <Paper
            variant="outlined"
            sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}


          >

            <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>

              {/*=======================================(Prefix)===========================================================*/}
              <Grid
                xs={12}
                md={8}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel
                  id="demo-simple-select-helper-label"
                  sx={{ marginRight: 6.5, fontSize: 17, paddingBottom: 2 }}
                >
                  คำนำหน้า
                </FormLabel>
                <Select
                  // labelId="demo-simple-select-helper-label"
                  id="PrefixID"
                  value={member.PrefixID + ""}
                  native
                  onChange={handleChange}
                  inputProps={{
                    name: "PrefixID",
                  }}
                  fullWidth
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกคำนำหน้า
                  </option>
                  {prefix.map((item: PrefixInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Prefix_Name}
                    </option>
                  ))}
                </Select>
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  คำนำหน้าชื่อ
                </FormHelperText>
              </Grid>

              {/*============================================(First name)======================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Firstname</p>
                <TextField
                  id="Fristname"
                  type="string"
                  label="ชื่อ"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => {
                    setFirstname(event.target.value);
                  }}
                />
              </Grid>
              {/*=============================================(Last name)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Lastname</p>
                <TextField
                  id="lastname"
                  type="string"
                  label="สกุล"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => {
                    setLastname(event.target.value);
                  }}
                />
              </Grid>
              {/*=============================================(Nickname)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Nickname</p>
                <TextField
                  id="nickname"
                  type="string"
                  label="ชื่อเล่น"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => {
                    setNickname(event.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>
              {/*============================================(Age)======================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Age</p>
                <TextField
                  id="Age"
                  type="number"
                  label="อายุ"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  value={member.Age || ""}
                  fullWidth
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              {/*=============================================(Phone)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Phone number</p>
                <TextField
                  id="Phone"
                  type="string"
                  label="เบอร์โทรศัพท์"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
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
                  label="กรุณาป้อนอีเมล"
                  variant="outlined"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              {/*==============================================(password)====================================================*/}
              <Grid
                xs={12}
                md={9}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ marginRight: 3, fontSize: 17 }}
                >
                  Password:
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={password.showPassword ? "text" : "password"}
                  value={password.password}
                  onChange={handlePassword("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{ maxLength: 8 }}
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
                  required
                  id="Gender_ID"
                  value={member.GenderID + ""}
                  onChange={handleChange}
                  fullWidth
                  native
                  inputProps={{
                    name: "GenderID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกเพศ
                  </option>
                  {gender.map((item: GenderInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.G_Name}
                    </option>
                  ))}
                </Select>
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  กรุณาเลือกเพศของคุณ
                </FormHelperText>
              </Grid>

              {/**/}
              <Grid
                xs={12}
                >
              </Grid>

              <Grid
                container
                xs={12}
                md={12}
                gap={2}
                sx={{ justifyContent: "center", margin: 1 }}
              >
                <Button variant="contained" size="large" onClick={submit}>
                  สมัครสมาชิก
                </Button>
                <Link to="/Homeshow" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "#fff", color: "#1976d2" }}
                  >
                    กลับ
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Container>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {/* บันทึกข้อมูลไม่สำเร็จ */}
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreatMember;
