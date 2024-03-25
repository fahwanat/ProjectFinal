import React, { useEffect, useState, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Button, Container, createTheme, FormControl, FormLabel, 
    Grid, Paper, Select, SelectChangeEvent, Snackbar, TextField, 
    Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { ServiceInterface } from "../../models/IService";
import { MemberInterface } from "../../models/modelMember/IMember";
import { MethodsInterface, PaymentMethodsInterface, PaymentsInterface, PlacesInterface } from "../../models/IPayment";
import { AddPayment,DeleteBookings, DeleteServices, GetDestination, GetMethods, GetPaymentMethods, GetPriceBookingCID, } from "./service/PaymentHttpClientService";

import { DatePicker, DateTimeField } from "@mui/x-date-pickers";
import { GetMemberByUID } from "../Member/service/servicecus";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentCreate() {
    const [payment, setPayment] = useState<Partial<PaymentsInterface>>({});
    const [time, setTime] = useState<Date | null>(new Date());
    const [paymet, setPaymet] = useState<PaymentMethodsInterface[]>([]);
    const [paymetid, setPaymetid] = useState('');
    const [method, setMethod] = useState<MethodsInterface[]>([]);
    const [destination, setDestination] = useState<string | null>(null);
    const [metid, setMetid] = useState('');
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [booking, setBooking] = useState<Partial<BookingsInterface>>({});
    const [services, setServices] = useState<ServiceInterface[]>([]);
    const [members, setMembers] = useState<MemberInterface>();
   
    const [message, setAlertMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const id_mem = localStorage.getItem("id");
    const [price, setPrice] = useState(0);

    const [BookingDate, setBookingDate] = React.useState<Dayjs | null>(dayjs());

    const [openForCreate, setOpenForCreate] = React.useState(false);

     //ถ้ามีการกด ADD Review จะมีหน้าต่างขึ้นในส่วนการเขียนรีวิว
  const handleClickOpenForCreate = () => {
    setOpenForCreate(true);
  };
  const handleCloseForCreate = () => {
    setOpenForCreate(false);
  };

  const handleImageChange = (event: any) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
        const base64Data = reader.result;
        setImage(base64Data)
    }
}

const handleMet = (event: { target: { name: string; value: any; }; }) => {
    const name = event.target.name as keyof typeof payment;
    const getmetid = event.target.value;

    setMetid(getmetid);
    setPayment({
        ...payment,
        [name]: event.target.value
    });
};

const handlePayMet = (event: { target: { name: string; value: any; }; }) => {
    const name = event.target.name as keyof typeof payment;
    const getpaymetid = event.target.value;

    setPaymetid(getpaymetid);
    setPayment({
        ...payment,
        [name]: event.target.value
    });
};

const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof payment;
    setPayment({
        ...payment,
        [name]: event.target.value
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

const convertType = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
};

async function submit() {
    let data = {
        MemberID: convertType(id_mem),
        PaymentMethodID: convertType(payment.PaymentMethodID),
        MethodID: convertType(payment.MethodID),
        Price: price,
        Time: time,

    };
    let res = await AddPayment(data);
    if (res.status) {
        await DeleteBookings(id_mem);
        setAlertMessage("ชำระเงินสำเร็จ");
        setSuccess(true);
        setInterval(() => {
            window.location.assign("/Payment/Show");
        }, 2000);
    } else {
        setAlertMessage(res.message);
        setError(true);
    }
}

const getpaymentMethods = async () => {
    let res = await GetPaymentMethods();
    if (res) {
        setPaymet(res);
    }
};

const getmethodp = async () => {
    let res = await GetMethods();
    if (res) {
        setMethod(res);
    }
};

const getdestination = async () => {
    let res = await GetDestination(metid);
    if (res) {
        setDestination(res);
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

// const apiUrl = "http://localhost:8080";
// const requestOptionsGet = {
// method: "GET",
// headers: {
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
//   "Content-Type": "application/json",
// },
// };

const getpriceofbooking = async () => {
    let res = await GetPriceBookingCID(id_mem);
    if (res) {
        setPrice(res);
    }
};

useEffect(() => {
    getpaymentMethods();
    getmethodp();
    getMember();
    getdestination();
    getpriceofbooking();
}, [metid]);

console.log(price);

    return (
        <div>
             <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          height: '134vh',
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        //   backgroundSize: "contain",
        //   backgroundImage:"url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
            }}>
        <Container maxWidth="md" sx={{ marginTop: 1, }} >
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
            <Paper sx={{
        p: 2,
        margin: 'auto',
        marginTop: 0.5,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}>
                <Box display="flex" sx={{ marginTop: 0.1, }} >
                    <Box sx={{ paddingX: 2, paddingY: 0.5 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom >
                            ชำระค่ามัดจำ
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={1} sx={{ padding: 1 }} >
                    {/* <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                            <p>วิธีชำระเงิน</p>
                            <Select
                                native
                                value={payment.PaymentMethodID + ""}
                                    onChange={handlePayMet}
                                    inputProps={{
                                    name: "PaymentMethodID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกวิธีชำระเงิน
                                </option>
                                {paymet.map((item: PaymentMethodsInterface) => (
                                   <option value={item.ID} >{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ช่องทางการชำระเงิน</p>
                            <Select
                                native
                                value={payment.MethodID + ""}
                                    onChange={handleMet}
                                    inputProps={{
                                    name: "MethodID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกช่องทางการชำระเงิน
                                </option>
                                {method.map((item: MethodsInterface) => (
                                    <option value={item.ID}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <p>หมายเลข </p>
                                                <TextField
                                                    variant="outlined"
                                                    value={destination}
                                                    InputProps={{
                                                        // style: { fontFamily: 'Comic Sans MS' },
                                                        readOnly: true,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                            <p>จำนวนเงิน คิด 50 %</p>
                                <TextField
                                    variant="outlined"
                                    value={Math.floor(price * 0.5)}
                                    InputProps={{
                                    // style: { fontFamily: 'Comic Sans MS' },
                                    readOnly: true,
                                        }}
                                            />
                                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>วันที่ชำระเงิน</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimeField
                            disabled
                            //   label="Format without meridiem"
                           defaultValue={dayjs()}
                           format="L HH:mm"
                            />
                          </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Typography
                                gutterBottom
                            >
                            </Typography>

                            <Grid
                                container
                                sx={{
                                    flexGrow: 1,
                                    // fontFamily: "Comic Sans MS",
                                }}
                            >
                                <Grid
                                sx={{ marginTop: 2, }}
                                    container
                                    justifyContent="center"
                                    
                                    // gap={2.5}
                                >
                                    <img src={`${image}`} width="270" height="400" />
                                    <FormControl fullWidth variant="outlined"  >
                                        <p>โปรดแนบ Slip ยืนยัน</p>
                                        <input type="file" onChange={handleImageChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>

                    {/* <Grid item xs={8}>
                        <FormControl fullWidth variant="outlined">
                            <p>ชื่อผู้ชำระเงิน</p>
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
                        </FormControl> */}
                    {/* </Grid> */}
                    <Grid item xs={12}>
                        <Button sx={{ marginTop: 1, }}
                            component={RouterLink}
                            to="/Book"
                            variant="contained"
                            color="inherit"
                        >
                            ยกเลิก
                        </Button>
                        <Button sx={{ marginTop: 2, float: "right"}}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            ยืนยันการชำระเงิน
                        </Button>
                    </Grid>  
                </Grid>
            </Paper>
        </Container>
        </Container>
        </div>
    );
}
export default PaymentCreate;