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
import { AppBar, Box, FormControl, Stack, ThemeProvider, Toolbar, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import People from "@mui/icons-material/People";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import { pink, common } from "@mui/material/colors";
import Logo5 from "../../Image/LOGO5.png"
import { Link as RouterLink } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const bgnavbar = createTheme({
  palette: {
    primary: {
      // Purple and grey play nicely together.
      main: pink[200],
    },
    secondary: {
      // Purple and grey play nicely together.
      main: common['black'],
    },

  },
});


function CreatMember() {
  // =========================(Use State)====================================================

  const [member, setMember] = useState<MemberInterface>({});
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [line, setLine] = useState<string>("");
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
      Line: line,
      Age: convertType(member.Age),
      Phone: phone,
      GenderID: convertType(member.GenderID),
      PrefixID: convertType(member.PrefixID),
      Signin: {
        Username: member.Phone ?? "",
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
    <ThemeProvider theme={bgnavbar}>
        <AppBar position="fixed">
        <Toolbar>
          <div>
            <img src={Logo5} width= "75px" height="75px"/>
          </div>
          <Box sx={{  display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      width: '50%'}}>
            <Typography variant="h6" color='secondary' noWrap component="div" marginLeft={2} >
              <div className="word-header-navbar">
                <h1>Beauty Salon</h1>
              </div>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '30%'}}>
            <Button component={RouterLink} to="/Homeshow"  color='secondary' sx={{ display: 'flex', width: '20%'}} >หน้าแรก</Button>
            <Button component={RouterLink} to="/Review"  color='secondary' sx={{ display: 'flex', width: '10%'}}>แนะนำ</Button>
            <Button component={RouterLink} to="/About"  color='secondary' sx={{ display: 'flex', width: '25%'}}>เกี่ยวกับ</Button>

          </Box>
          {/* <Box sx={{ display: 'flex', width: '3%'}}>
            <IconButton component={RouterLink} to="/member/create" sx={{ display: 'flex', width: '10%'}} color='secondary' >
              <PersonAddIcon />
            </IconButton>
          </Box> */}
          <Box sx={{ display: 'flex', width: '8.5%'}}>
          <Button component={RouterLink} to="/member/create" variant="contained" color='secondary' >สมัครสมาชิก</Button>
          </Box>
          <Box sx={{ display: 'flex', width: '7.4%'}}>
          <Button component={RouterLink} to="/SignIn" variant="contained" color='secondary' >เข้าสู่ระบบ</Button>
          </Box>
          <Box sx={{ display: 'flex', width: '8.5%'}}>
          <Button component={RouterLink} to="/SignIn" variant="contained" color='secondary' >จองคิว</Button>
          </Box>

        </Toolbar>
  
        </AppBar>
    <div>
      <Container
        maxWidth="xl"
        sx={{
          height: "99.45vh",
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
          <Box flexGrow={1} sx={{ marginTop: 18 }} textAlign={"center"}>
            <Typography
              component="h2"
              variant="h6"
              gutterBottom
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              สมัครสมาชิก
            </Typography>
          </Box>

          <form>
            <Paper
              variant="outlined"
              sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}
            >
              {/*=======================================(Title)===========================================================*/}
              <Grid container spacing={2} sx={{ marginBottom: 1.5 , marginTop:1}}>
                <Grid xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>คำนำหน้า</p>
                <Select
                  labelId="demo-simple-select-helper-label"
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
                    กรุณาเลือกคำนำหน้า *
                  </option>
                  {prefix.map((item: PrefixInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Prefix_Name}
                    </option>
                  ))}
                </Select>
                </FormControl>
              </Grid>

              {/*============================================(First name)======================================================*/}
              <Grid xs={6} md={6}>
                <p>ชื่อ</p>
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
                  <p>นามสกุล</p>
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
                  <p>ชื่อเล่น</p>
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
                  <p>อายุ</p>
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
              <p>เบอร์มือถือ</p>
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


            {/*===========================================(Line)=======================================================*/}
            <Grid container spacing={1}>
            <Grid xs={6} md={6}>
            <p>ไอดีไลน์</p>
                <TextField
                  type="Line"
                  id="outlined-basic"
                  label="กรุณาป้อนไอดีไลน์"
                  variant="outlined"
                  // required
                  onChange={(event) => {
                    setLine(event.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              {/*=======================================(select Gender)===========================================================*/}
              <Grid xs={6} md={6}>
                <p>เพศ</p>
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
                    กรุณาเลือกเพศ *
                  </option>
                  {gender.map((item: GenderInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.G_Name}
                    </option>
                  ))}
                </Select>
              </Grid>
              {/*==============================================(password)====================================================*/}
              <Grid xs={6} md={6}>
                <p>รหัสผ่าน</p>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={password.showPassword ? "text" : "password"}
                  value={password.password}
                  fullWidth
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
                <Typography
                  sx={{ marginRight: -15, fontSize: 14, color: "text.secondary" }}
                >
                  เช่น A1234567 หรือ AB123456
                </Typography>
              </Grid>
             

              <Stack direction="row" spacing={70} sx={{ marginTop: 2 }}>
                 <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<People />} 
                    onClick={submit}
                    style={{ backgroundColor: "#1976d2", color: "#fff" }}
                  >
                  สมัครสมาชิก
                </Button>
                <Link to="/Homeshow" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<HouseIcon />}
                      style={{ backgroundColor: "#009933", color: "#fff" }}
                    >
                      กลับ
                    </Button>
                  </Link>
                  </Stack>
            </Grid>
          </Paper>
        </form>
      </Container>
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
    </ThemeProvider>
  );
}

export default CreatMember;
