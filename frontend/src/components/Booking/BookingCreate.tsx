import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { TimeBookingInterface } from "../../models/modelBooking/ITimeBooking";
import { EmployeeInterface } from "../../models/IManage";
import { ServiceInterface } from "../../models/IService";
import { MemberInterface } from "../../models/modelMember/IMember";
import { Bookings, GetMemberByUID, GetEmployees} from "./services/BookingHttpClientService";
import { GetServices } from "../Service/service/ServiceHttpClientService";
import { JSX } from "react/jsx-runtime";
import { DatePicker } from "@mui/x-date-pickers";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookingCreate() {
    const [booking, setBooking] = useState<Partial<BookingsInterface>>({});
    const [timebooking, setTimeBooking] = useState<TimeBookingInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [services, setServices] = useState<ServiceInterface[]>([]);
    const [members, setMembers] = useState<MemberInterface>();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");

    const [BookingDate, setBookingDate] = React.useState<Dayjs | null>(dayjs());
    // const today = dayjs().subtract(1, 'day');

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

    const getEmployees = async () => {
        let res = await GetEmployees();
        if (res) {
            setEmployees(res);
        }
    };


    const getServices = async () => {
        let res = await GetServices();
        if (res) {
            setServices(res);
        }
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

    const apiUrl = "http://localhost:8080";
    const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

    // const getTimeBooking = async () => {
    //     let res = await GetTimeBookingByUID();
    //     if (res) {
    //         setTimeBooking(res);
    //     }
    // };
   

    const fetchTimeBooking = async () => {
        fetch(`${apiUrl}/bookings/time_bookings`, requestOptionsGet)
          .then((response) => response.json())
          .then((result) => {
            setTimeBooking(result.data);
          });
      };

    // =========================(Fetch API)====================================================

    useEffect(() => {
        // getTimeBooking();
        fetchTimeBooking();
        getEmployees();
        getServices();
        getMember();
    }, []);

    //for convert data type string to int
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        setBookingDate(dayjs());
        let data = {
            EmployeeID: convertType(booking.EmployeeID),
            ServiceID: convertType(booking.ServiceID),
            BookingDate: BookingDate,
            TimeBookingID: convertType(booking.TimeBookingID),
            //Stop: booking.Stop,
            MemberID: convertType(booking.MemberID),
        };

        console.log(data);

        // const apiUrl = "http://localhost:8080/NewBook/Create";
        // const requestOptions = {
        //     method: "POST",
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // };
        // fetch(apiUrl, requestOptions)
        //     .then((response) => response.json())
        //     .then((res) => {
        //     if (res.data) {
        //         setAlertMessage("บันทึกข้อมูลสำเร็จ");
        //         setSuccess(true);
        //     } else {
        //         setAlertMessage(res.error);
        //         setError(true);
        //     }
        // });

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
        <Container maxWidth="xs">
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
                            <p>ข้อมูลช่าง **(1:ช่างทำผม, 2:ช่างทำเล็บ, 3:ช่างทำหน้า)</p>
                            <Select
                                native
                                value={booking.EmployeeID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "EmployeeID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกช่าง
                                </option>
                                {employees.map((item: EmployeeInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                    {item.Employeename} : {item.PositionID}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ข้อมูลบริการ</p>
                            <Select
                                native
                                value={booking.ServiceID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "ServiceID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกบริการ
                                </option>
                                {services.map((item: ServiceInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                    {item.Name} ราคา: {item.Price} บาท
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>วันที่จอง</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // {...props}
                                // slots={{
                                //     textField: textFieldProps => <TextField {...textFieldProps} />
                                // }}
                            //   renderInput={(props) => <TextField {...props} />}
                              label="BookingDate"
                              value={BookingDate}
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
                                id="TimeBookingID"
                                value={booking.TimeBookingID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "TimeBookingID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกเวลา
                                </option>
                                {timebooking.map((item: TimeBookingInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                    {item.Start_End}
                                    </option>
                                ))}
                            </Select>
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
                        <Button
                            component={RouterLink}
                            to="/Book"
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
    );
}
export default BookingCreate;