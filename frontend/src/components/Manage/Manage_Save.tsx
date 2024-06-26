import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  createTheme,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import {
  DepartmentInterface,
  EmployeeInterface,
  OfficerInterface,
  PositionInterface,
} from "../../models/IManage";
import { grey } from "@mui/material/colors";
import { ServiceTypeInterface } from "../../models/IService";

const bgbutton = createTheme({
  palette: {
    primary: {
      // Purple and grey play nicely together.
      main: grey[800],
    },
    secondary: {
      // Purple and grey play nicely together.
      main: grey[50],
    },

  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Manage_Save() {
  const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>(
    {
      DepartmentID: 0,
      PositionID: 0,
    }
  );
  const [department, setDepartment] = React.useState<DepartmentInterface[]>([]);
  const [position, setPosition] = React.useState<PositionInterface[]>([]);
  const [servicetype, setServiceType] = React.useState<ServiceTypeInterface[]>([]);
  const [user, setUser] = React.useState<OfficerInterface>();
  const [gender, setGender] = React.useState<string>("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");

  //-----------เริ่มดึงข้อมูล-----------//
//---------------------Department-------------------------------------
const getDepartment = async () => {
  const apiUrl = `http://localhost:8080/Departments`;

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
      console.log(res.data); //show ข้อมูล

      if (res.data) {
        setDepartment(res.data);
      } else {
        console.log("else");
      }
    });
};
//---------------------Position-------------------------------------
const getPosition = async () => {
  const apiUrl = `http://localhost:8080/Positions`;

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
      console.log(res.data); //show ข้อมูล

      if (res.data) {
        setPosition(res.data);
      } else {
        console.log("else");
      }
    });
};

const getServiceType = async () => {
  const apiUrl = `http://localhost:8080/services_types`;

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
      console.log(res.data); //show ข้อมูล

      if (res.data) {
        setServiceType(res.data);
      } else {
        console.log("else");
      }
    });
};

//----------------------------------จบการดึงข้อมูล------------------------

//==========เปิด ปิด การบันทึกและ error
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
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Manage_Save;

    const { value } = event.target;

    setEmployee({ ...employee, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof employee;
    setEmployee({
      ...employee,
      [name]: event.target.value,
    });
  };

  function submit() {
    let data = {
      PersonalID: employee.PersonalID,
      Employeename:  employee.Employeename ,
      Email: employee.Email ,
      Tusername: employee.Tusername ?? "",
      Password: employee.Password ?? "",
      Salary: typeof employee.Salary === "string" ? parseInt(employee.Salary) : 0,
      Phonenumber: employee.Phonenumber ?? "",
      Gender: gender,
      
      OfficerID: user?.ID ?? "",
      DepartmentID: Number(employee.DepartmentID),
      PositionID: Number(employee.PositionID),
      ServiceTypeID: Number(employee.ServiceTypeID),
      Signin: {
        Username: employee.Tusername ?? "",
        Password: employee.Password ?? "",
      }
    };

    const apiUrl = "http://localhost:8080/employees";

    const requestOptions = {
      method: "POST",

      headers:       
      {  
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" 
      },

      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {       
        console.log(res)
        if (res.data) {
          setSuccess(true);
          setInterval(() => {
            window.location.assign("/ManageShow");
          }, 1000);
        } else {
        
          setError(true);
          setAlertMessage(res.error);
        }
      });
  }

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
    getDepartment();
    getPosition();
    getServiceType();

  }, []);

  return (
  <div>
      <Container maxWidth="xl"        sx={{
            height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}>
    <Container maxWidth="xl" >
      <Snackbar
        id="success"        
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar 
        id="error"
        open={error} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              // color="primary"
              gutterBottom
              sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              เพิ่มข้อมูลพนักงาน
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "14.5%"}}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>เลขประจำตัวประชาชน</p>

              <TextField
                id="PersonalID"
                variant="outlined"
                type="string"
                size="medium"
                value={employee.PersonalID || ""}
                onChange={handleInputChange}
                inputProps = {{ maxLength : 13 }}
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ-นามสกุล</p>
              <TextField
                id="Employeename"
                variant="outlined"
                type="string"
                size="medium"
                value={employee.Employeename || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ padding: 2 }} style={{marginLeft: "14.5%"}}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อผู้ใช้งาน</p>

              <TextField
                id="Tusername"
                variant="outlined"
                type="string"
                size="medium"
                value={employee.Tusername || ""}
                onChange={handleInputChange}
              />
              <h6 className="grey-text">** ขึ้นต้นด้วย T และตามตัวพิมพ์ใหญ่ 1 ตัวและตามด้วยตัวพิมพ์เล็ก **</h6>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>รหัสผ่าน</p>

              <TextField
                id="Password"
                variant="outlined"
                type="string"
                size="medium"
                value={employee.Password || ""}
                onChange={handleInputChange}
              />
              <h6 className="grey-text">** ขึ้นต้นด้วยตัวพิมพ์ใหญ่ 1 ตัว และมีต้องมีอย่างน้อย 6 ตัว **</h6>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ padding: 2 }} style={{marginLeft: "14.5%"}}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>อีเมล</p>

              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                value={employee.Email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขติดต่อ</p>

              <TextField
                id="Phonenumber"
                variant="outlined"
                type="string"
                size="medium"
                value={employee.Phonenumber || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ padding: 2 }} style={{marginLeft: "14.5%"}}>
        {/* ComboboxPosition */}
          <Grid item xs={3}>
            <FormLabel>ตำแหน่ง</FormLabel>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee.PositionID}
                onChange={handleChange}
                inputProps={{
                  name: "PositionID",
                }}
              >
                <option value={0} key={0}>
                  กรุณาเลือกตำแหน่ง
                </option>
                {position.map((item: PositionInterface) => (
                  <option value={item.ID}>{item.Name}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormLabel>ประเภทบริการ</FormLabel>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee.ServiceTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "ServiceTypeID",
                }}
              >
                <option value={0} key={0}>
                  กรุณาเลือกประเภทบริการ
                </option>
                {servicetype.map((item: ServiceTypeInterface) => (
                  <option value={item.ID}>{item.Name}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <FormLabel>เงินเดือน</FormLabel>

              <TextField
                id="Salary"
                variant="outlined"
                type="string"
                size="medium"
                value={employee.Salary || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
        </Grid>


        <Grid container spacing={3} sx={{ padding: 2 }} style={{marginLeft: "14.5%"}}>
          <Grid item xs={6}>
            <FormControl>
              <p>เพศ</p>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="หญิง"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="ชาย"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ padding: 2 }}>
          {/* <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>บันทึกข้อมูลโดย</p>

              <TextField
                fullWidth
                disabled
                id="OfficerID"
                value={user?.Officername}
                //value={officer?.ID || ""}
                // onChange={(event) => setOffID(Number(event.target.value)) }
              />
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <Button component={RouterLink} to="/ManageShow" variant="contained" color="inherit">
              แสดงข้อมูลพนักงานทั้งหมด
            </Button>

            <Button 
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="success"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </Container>
</div>
  );
}

export default Manage_Save;