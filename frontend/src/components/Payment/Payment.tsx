import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link as RouterLink, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PaymentsInterface } from "../../models/IPayment";
import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FormLabel } from "@mui/material";
import { OfficerInterface } from "../../models/IManage";
import { AddPayment, GetBookings, GetMemberByUID, GetPayment, GetPriceBookingCID, } from "./service/PaymentHttpClientService";
import { MemberInterface } from "../../models/modelMember/IMember";
import { CHK_PaymentStatusesInterface } from "../../models/modelCHK_Payment/IStatus";
import { CHK_PaymentsInterface } from "../../models/modelCHK_Payment/ICHK_Payment";
import { GetStatuses } from "../CHK_Payment/services/CHK_PaymentHttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Payment(){
    const [payments, setPayments] = useState<Partial<PaymentsInterface>>({});
    const [time, setTime] = useState<Date | null>(new Date());
    const [bookings, setBookings] = useState<Partial<BookingsInterface>>({});
    const [statuses, setStatuses] = useState<CHK_PaymentStatusesInterface[]>([]);
    const [user, setUser] = React.useState<OfficerInterface>();
    const [members, setMembers] = useState<MemberInterface>();
    const [chk_payment, setCHK_Payment] = useState<Partial<CHK_PaymentsInterface>>({});
    const [price, setPrice] = useState(0);
    const id_mem = localStorage.getItem("id");
    const { id } = useParams();
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");


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
        const name = event.target.name as keyof typeof payments;
        setPayments({
            ...payments,
            [name]: event.target.value,
        });
    };

    const handleChangeBooking = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof bookings;
        setBookings({
            ...bookings,
            [name]: event.target.value,
        });
    };

    const handleInputChange_Text = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
        const id = event.target.id as keyof typeof chk_payment;
        const { value } = event.target;
        setCHK_Payment({ ...chk_payment, [id]: value, });
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const convertType_C = (data: string | number | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const getMember = async () => {
        let res = await GetMemberByUID();
        if (res) {
            setBookings({
                ...bookings,
                MemberID: res.ID,
            });
            setMembers(res);
        }
    }

    async function submit() {
        let data = {
            MemberID: convertType(bookings.MemberID),
            ServiceTypeID: convertType(bookings.ServiceTypeID),
            ServiceID: convertType(bookings.ServiceID),
            TimeServiceID: convertType(bookings.TimeServiceID),
            CHK_PaymentStatusID: convertType(chk_payment.CHK_PaymentStatusID),
            Time: time,
            Price: price,
        };

        console.log(data);

        let res = await AddPayment(data);
        if (res.status) {
            setAlertMessage("บันทึกการชำระเงินสำเร็จ");
            setSuccess(true);
            setInterval(() => {
                window.location.assign("/CPM");
            }, 2000);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }

    // const getpriceofbooking = async () => {
    //     let res = await GetPriceBookingCID(id_mem);
    //     if (res) {
    //         setPrice(res);
    //     }
    // };

    const getBookings = async () => {
        let res = await GetBookings();
        if (res) {
            setBookings(res);
        }
    };

    const getStatuses = async () => {
        let res = await GetStatuses();
        if (res) {
            setStatuses(res);
        }
    };

    const getBooking = async () => {
    const apiUrl = `http://localhost:8080/bookings`;
  
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
        // console.log(res.data); //show ข้อมูล
  
        if (res.data) {
          setBookings(res.data);
          // setEm(res.data);
          
        } else {
        //   console.log("else");
        }
      });
  };

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
          setUser(JSON.parse(localStorage.getItem("user") || ""));
        }   

        // getpriceofbooking();
        getMember();
        getStatuses();
        getBooking();
        getBookings();
      }, []);

    return (
        <Container maxWidth="md" sx = {{ marginTop: 5,}} >
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
            <Box display="flex" sx={{ marginTop: 2, }} >
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} >
                        การชำระเงิน
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>ลูกค้า</p>
                        <TextField
                            fullWidth
                            disabled
                            id="MemberID"
                            value={bookings?.MemberID}
                        />
                        {/* <Select
                            native
                            value={members?.FirstName + ""}
                            onChange={handleChangeBooking}
                            inputProps={{
                                name: "MemberID",
                            }}
                        >
                            <option aria-label="None" value="">
                                กรุณาเลือกรายการชำระเงิน
                            </option>
                            {bookings.map((item: BookingsInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.ID}
                                </option>
                            ))}
                        </Select> */}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>บริการ</p>
                        <TextField
                            fullWidth
                            disabled
                            id="ServiceID"
                            value={bookings?.ServiceID}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>จำนวนเงินที่ชำระ</p>
                        <TextField
                            disabled
                            variant="outlined"
                            id="Service"
                            value={bookings?.Total}
                        />
                    </FormControl>
                </Grid>
                {/* <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>สถานะการชำระเงิน</p>
                        <Select
                                native
                                value={chk_payment.CHK_PaymentStatusID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "CHK_PaymentStatusID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกสถานะการชำระเงิน
                                </option>
                                {statuses.map((item: CHK_PaymentStatusesInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Type}
                                    </option>
                                ))}
                            </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>ผู้รับเงิน</p>

                        <TextField
                        fullWidth
                        disabled
                        id="OfficerID"
                        value={user?.Officername}
                        />
                    </FormControl>
                </Grid>
                {/* <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>หมายเหตุ</p>
                        <TextField
                            type="text"
                            value={chk_payment.Description}
                            id="Description"
                            variant="outlined"
                            inputProps = {{
                                name: "Description"
                            }}
                            // onChange = {handleInputChange_Text}
                        />
                    </FormControl>
                </Grid>  */}
                <Grid item xs={12}>
                    <Button
                        component={RouterLink}
                        to="/Payment/Show"
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
    );

}
export default Payment;