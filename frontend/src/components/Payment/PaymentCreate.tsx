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
import { MethodsInterface, PaymentMethodsInterface, PaymentsInterface } from "../../models/IPayment";
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Data = reader.result;
            setImage(base64Data);
        };
    }
};


//   const handleImageChange = (event: any) => {
//     const image = event.target.files[0];

//     const reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onload = () => {
//         const base64Data = reader.result;
//         setImage(base64Data)
//     }
// }

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
        if (!image) {
        setAlertMessage("กรุณาแนบรูปสลิป");
        setError(true);
        return;
    }

    let data = {
        MemberID: convertType(id_mem),
        PaymentMethodID: convertType(payment.PaymentMethodID),
        MethodID: convertType(payment.MethodID),
        Price: price,
        Time: time,
        Picture: image,
    };
    let res = await AddPayment(data);
    if (res.status) {
        await DeleteBookings(id_mem);
        setAlertMessage("ชำระเงินสำเร็จ");
        setSuccess(true);
        setInterval(() => {
            window.location.assign("/Homeshow");
        }, 2000);
    } else {
        setAlertMessage(res.message);
        setError(true);
    }
}

// async function submit() {
//     if (!image) {
//         setAlertMessage("กรุณาแนบรูปสลิป");
//         setError(true);
//         return;
//     }

//     let data = {
//         MemberID: convertType(id_mem),
//         PaymentMethodID: convertType(payment.PaymentMethodID),
//         MethodID: convertType(payment.MethodID),
//         Price: price,
//         Time: time,
//         Image: image,
//     };
//     let res = await AddPayment(data);
//     if (res.status) {
//         await DeleteBookings(id_mem);
//         setAlertMessage("ชำระเงินสำเร็จ");
//         setSuccess(true);
//         setInterval(() => {
//             window.location.assign("/Payment/Save");
//         }, 2000);
//     } else {
//         setAlertMessage(res.message);
//         setError(true);
//     }
// }


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
        <Container maxWidth="xl"        sx={{
            height: '130vh',
    width: '100vw',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}>
        <Container maxWidth="md" sx = {{ marginTop: 3,}} >
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
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
            <Box display="flex" sx={{ marginTop: 5, }} >
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="h5" color="primary" gutterBottom>
                        ชำระค่ามัดจำ
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>หมายเลขบัญชี </p>
                        <TextField
                        variant="outlined"
                        value={destination}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </FormControl>
                </Grid>
                
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>จำนวนเงินที่ต้องชำระ คิด 50 %</p>
                        <TextField
                        variant="outlined"
                        value={Math.floor(price * 0.5)}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>วันที่ชำระเงิน</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimeField
                        disabled
                        defaultValue={dayjs()}
                        format="L HH:mm"
                        />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom></Typography>
                    <Grid container sx={{ flexGrow: 1,}} >
                    {/* <Grid
                    sx={{ marginTop: 2, }}
                    container
                    justifyContent="center"
                    > */}
                        <FormControl fullWidth variant="outlined"  >
                        <p>โปรดแนบสลิปยืนยัน</p>
                        <img src={`${image}`} style={{ maxWidth: '80%', height: '80' }}/>
                        <input type="file" onChange={handleImageChange} />
                        </FormControl>
                    {/* </Grid> */}
                    </Grid>
                </Grid>
                
                
                <Grid item xs={12}>
                    <Button
                        component={RouterLink}
                        to="/BookConfirm"
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
                        บันทึก
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Container>
        </Container>

    );
}
export default PaymentCreate;