import React, { useEffect, useState, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Button, Container, createTheme, FormControl, FormLabel, 
    Grid, Paper, Select, SelectChangeEvent, Snackbar, TextField, 
    Typography, Card, CardActions, CardContent  } from "@mui/material";
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
import { DeleteBookings, DeleteServices, GetDestination, GetMethods, GetPayment, GetPaymentByID, GetPaymentMethods, GetPriceBookingCID, } from "./service/PaymentHttpClientService";

import { DatePicker, DateTimeField } from "@mui/x-date-pickers";
import { GetMemberByUID } from "../Member/service/servicecus";

import thx from "../../Image/thx.jpg"
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentSave() {
    const [booking, setBooking] = useState<Partial<BookingsInterface>>({});
    const [members, setMembers] = useState<MemberInterface>();
    const [price, setPrice] = useState(0);
    const [payment, setPayment] = useState(0);
    const id_mem = localStorage.getItem("id");

    const [message, setAlertMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
    const getpriceofbooking = async () => {
        let res = await GetPriceBookingCID(id_mem);
        if (res) {
            setPrice(res);
        }
    };

    const getpayment = async () => {
        let res = await GetPaymentByID();
        if (res) {
            setPayment(res);
        }
    };

    async function submit() {
            setSuccess(true);
            setInterval(() => {
                window.location.assign("/home");
            }, 2000);
        
    }

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      useEffect(() => {
        getMember();
        getpriceofbooking();
        getpayment();
    })
    return (
        <div>
        {/* <Container maxWidth="md" >
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar> */}
            <Paper sx={{
        p: 2,
        margin: 'auto',
        marginTop: 5,
        maxWidth: 350,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}>
                <Box display="flex" sx={{ marginTop: 0.1, justifyContent: "center" }} >
                    <Box sx={{ paddingX: 2, paddingY: 0.5 }} textAlign="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ข้อมูลการชำระเงิน
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={1} sx={{ padding: 1 }} >
                    <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                    <center><Typography variant="body1" sx={{ marginBottom: 1 }}> ผู้ชำระเงิน : {members?.FirstName + " " + members?.LastName}</Typography></center>

                                            </FormControl>
                    </Grid>
                    {/* <Grid item xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <p>จำนวนบริการ</p>
                                                <TextField
                                                    variant="outlined"
                                                    // value={destination}
                                                    InputProps={{
                                                        // style: { fontFamily: 'Comic Sans MS' },
                                                        readOnly: true,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid> */}
                                        {/* <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                    <center><Typography variant="body2" sx={{ marginBottom: 1 }}>จำนวนเงินทั้งหมด : {Math.floor(payment * 0.5)} บาท</Typography></center>
                                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                        <center><Typography variant="body2" sx={{ marginBottom: 1 }}>วันที่ชำระเงิน : {dayjs().format('DD/MM/YYYY')}</Typography></center>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    {/* <center><p >เพิ่มเพื่อน เพื่อรับการแจ้งเตือนเพิ่มเติม</p></center> */}
                        <div><center><img src={thx} width= "240px" height="210px"/></center></div>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Button
                            onClick={submit}
                            variant="contained"
                            color="primary"
                            sx={{ margin: "auto" }} // Set margin to auto to center the button
                        >
                            เสร็จสิ้น
                        </Button>
                    </Grid>   
                </Grid>
            </Paper>
        {/* </Container> */}
        </div>
    );
}
export default PaymentSave;
