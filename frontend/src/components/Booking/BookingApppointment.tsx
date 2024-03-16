import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import TextField, { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldProps} from "@mui/material/TextField";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { EmployeeInterface } from "../../models/IManage";
import { ServiceTypeInterface, ServiceInterface, TimeServiceInterface } from "../../models/IService";
import { MemberInterface } from "../../models/modelMember/IMember";
import { Bookings, GetMemberByUID} from "./services/BookingHttpClientService";
import { GetService, GetServiceType ,GetPrice, GetTimeService } from "../Service/service/ServiceHttpClientService";
import { GetEmployeeBySID } from "../Manage/service/ManageHttpClientService";
import { DatePicker } from "@mui/x-date-pickers";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

function BookingAppointment() {

    let { id } = useParams();
    
    const [booking, setBooking] = useState<Partial<BookingsInterface>>({});
    
    const [servicetypes, setServiceTypes] = useState<ServiceTypeInterface[]>([]);
    const [servicetypeId, setServicesTypesId] = useState(0);
    const [services, setServices] = useState<ServiceInterface[]>([]);
    const [serviceId, setServicesId] = useState(0);
    const [timeservice, setTimeService] = useState<TimeServiceInterface[]>([]);
    const [timeserviceid, setTimeServiceId] = useState(0);
    const [employees, setEmployees] = useState<Partial<EmployeeInterface>>({});
    const [employeeId, setEmployeeId] = useState(0);
    const [priceservice, setPriceService] = useState<number | null>(null);
    const [members, setMembers] = useState<MemberInterface>();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");

    const [BookingDate, setBookingDate] = React.useState<Dayjs | null>(dayjs());
    const [maxBookingDate, setMaxBookingDay] = useState(dayjs().add(2, 'day'))

   
  
    const feachEmpolyeeID = async () => {
        fetch(`${apiUrl}/employee/${id}`, requestOptionsGet)
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
                setEmployees(result.data);
                console.log("services:",result.data );
                setEmployeeId(result.data.ID)
                setServices(result.data.ServiceType.Service)
            }
          });
      };

      const handleChangeEmployee = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof employees;
        
        setEmployees({
          ...employees,
          [name]: event.target.value,
        });
      };
      
      const handleInputChangeEmployee = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof employees;
        const { value } = event.target;
        setEmployees({ ...employees, [id]: value });
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

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof booking;
        setBooking({
            ...booking,
            [name]: event.target.value,
        });
    };

    const handleSer = (event: { target: { name: string; value: any; }; }) => {
        const name = event.target.name as keyof typeof booking;
        const getserid = event.target.value;

        setServicesId(getserid);
        setBooking({
            ...booking,
            [name]: event.target.value
        });
    };

    const handleTimeSer = (event: { target: { name: string; value: any; }; }) => {
        const name = event.target.name as keyof typeof booking;
        const gettimeserid = event.target.value;

        setTimeServiceId(gettimeserid);
        setBooking({
            ...booking,
            [name]: event.target.value
        });
    };

    const getMember = async () => {
        let res = await GetMemberByUID();
        if (res) {
            setBooking({
                ...booking,
                MemberID: res.ID,
            });
            setMembers(res);
        }
    }

    const getservicetype = async () => {
        let res = await GetServiceType();
        if (res) {
            setServiceTypes(res);
        }
    };
    const getservice = async () => {
        let res = await GetService(servicetypeId);
        if (res) {
            // setServices(res);
        }
    };
    const gettimeservice = async () => {
        let res = await GetTimeService(serviceId);
        if (res) {
            setTimeService(res);
        }
    };
    const getprice = async () => {
        let res = await GetPrice(serviceId);
        if (res) {
            setPriceService(res);
        }
    }
    const getemployee = async () => {
        let res = await GetEmployeeBySID(servicetypeId);
        if (res) {
            setEmployees(res);
        }
    };

    const apiUrl = "http://localhost:8080";
    const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const feachSerType = async () => {
    fetch(`${apiUrl}/services_types`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setServiceTypes(result.data);
      });
  };

 
    // =========================(Fetch API)====================================================

    useEffect(() => {
        // getEmployees();
        getMember();
        getservice();
        getservicetype();
        gettimeservice();
        getprice();
        getemployee();
        feachEmpolyeeID();
        // feachSerType();

    }, [servicetypeId, serviceId]);

    //for convert data type string to int
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        setBookingDate(dayjs());
        let data = {
            // EmployeeID: convertType(booking.EmployeeID),
            MemberID: convertType(booking.MemberID),
            BookingDate: BookingDate,
            ServiceTypeID: convertType(employees.ServiceTypeID),
            ServiceID: convertType(booking.ServiceID),
            TimeServiceID: convertType(booking.TimeServiceID),
            EmployeeID: employeeId
            
        };

        console.log("employee name:",employees.Employeename);
        

        console.log("data on submit:", data);

        let res = await Bookings(data);
        if (res.status) {
            setAlertMessage("จองคิวสำเร็จ");
            setSuccess(true);
            setInterval(() => {
                window.location.assign("/Book");
            }, 2000);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }

    return (
        <Container maxWidth="xl"
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            backgroundSize: "contain",
            backgroundImage:"url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
            <Container maxWidth="xs" sx={{marginBottom: 5}}>
            <Paper>
                <Box display="flex" sx={{ marginTop: 6, }} >
                    <Box sx={{ paddingX: 2, paddingY: 0.5 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom >
                            จองคิว
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={1} sx={{ padding: 1 }}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ข้อมูลประเภทบริการ</p>
                            <Select
                                disabled
                                id="ServiceType"
                                native
                                value={employees.ServiceTypeID + ""}
                                onChange={handleChangeEmployee}
                                inputProps={{
                                    name: "ServiceTypeID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกประเภทบริการ
                                </option>
                                {servicetypes.map((item: ServiceTypeInterface) => (
                                    <option value={item.ID} >{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>เลือกช่าง</p>
                            <TextField
                            fullWidth
                            disabled
                            id="EmployeeID"
                            type="string"
                            variant="outlined"
                            name="Employeename"
                            value={employees.Employeename}
                            onChange={handleInputChangeEmployee}
                          />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ข้อมูลบริการ</p>
                            <Select
                                native
                                value={booking.ServiceID + ""}
                                onChange={handleSer}
                                inputProps={{
                                    name: "ServiceID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกบริการ
                                </option>
                                {services.map((item: ServiceInterface) => (
                                    <option value={item.ID} >{item.Service_Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>วันที่จอง</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              value={BookingDate}
                              maxDate={maxBookingDate}
                              disablePast
                              onChange={(newValue) => {
                                setBookingDate(newValue); 
                              }}
                            />
                          </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>เวลาที่ต้องการเข้าใช้บริการ</p>
                            <Select
                                native
                                value={booking.TimeServiceID + ""}
                                onChange={handleTimeSer}
                                inputProps={{
                                    name: "TimeServiceID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกเวลาที่ต้องการเข้าใช้บริการ
                                </option>
                                {timeservice.map((item: TimeServiceInterface) => (
                                    <option value={item.ID} >{item.Start_End}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <FormLabel sx={{ fontFamily: "Comic Sans MS" }}> ราคาบริการ </FormLabel>
                                <TextField
                                    variant="outlined"
                                    value={priceservice}
                                    InputProps={{
                                        style: { fontFamily: 'Comic Sans MS' },
                                        readOnly: true,
                                    }}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth variant="outlined">
                            <p>จองโดย</p>
                            <Select
                                native
                                disabled
                                value={booking.MemberID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "MemberID",
                                }}
                            >
                                <option value={members?.ID} key={members?.ID}>
                                    {members?.FirstName} {members?.LastName}
                                </option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                            variant="body1" 
                            gutterBottom 
                            marginTop={1} 
                            marginBottom={-0.5}
                            color="red"
                        >
                            *** เมื่อคุณกดบันทึกการจองแล้ว คุณจะไม่สามารถแก้ไขข้อมูลการจองได้อีก ***
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            component={RouterLink}
                            to="/TechnicianAppointment"
                            variant="contained"
                            color="inherit"
                        >
                            กลับ
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            บันทึกการจอง
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            </Container>
        </Container>
    );
}
export default BookingAppointment;