import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { CHK_Payments, GetEmployeeByUID, GetStatuses, GetPayments } from "./services/CHK_PaymentHttpClientService";
import { EmployeeInterface, OfficerInterface } from "../../models/IManage";
import { CHK_PaymentStatusesInterface } from "../../models/modelCHK_Payment/IStatus";
import { PaymentsInterface } from "../../models/IPayment";
import { CHK_PaymentsInterface } from "../../models/modelCHK_Payment/ICHK_Payment";
// import { min } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateTimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CHK_PaymentCreate() {
    const [chk_payment, setCHK_Payment] = useState<CHK_PaymentsInterface>({});
    const [payments, setPayments] = useState<PaymentsInterface[]>([]);
    const [statuses, setStatuses] = useState<CHK_PaymentStatusesInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface>();
    const [user, setUser] = React.useState<OfficerInterface>();
    const [description, setDescription] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
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
        const name = event.target.name as keyof typeof chk_payment;
        setCHK_Payment({
            ...chk_payment,
            [name]: event.target.value,
        });
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

    const handleInputChange_Text = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
        const id = event.target.id as keyof typeof chk_payment;
        const { value } = event.target;
        setCHK_Payment({ ...chk_payment, [id]: value, });
        if (id === 'Description') {
            setDescription(value);
        }
    };

    const getStatuses = async () => {
        let res = await GetStatuses();
        if (res) {
            setStatuses(res);
        }
    };

    const getPayments = async () => {
        let res = await GetPayments();
        if (res) {
            setPayments(res);
        }
    };

    const getEmployeeByUID = async () => {
        let res = await GetEmployeeByUID();
        if (res) {
            setEmployees(res);
        }
    }

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
          setUser(JSON.parse(localStorage.getItem("user") || ""));
        } 

        getStatuses();
        getPayments();
        getEmployeeByUID();
    }, []);

    //for convert data type string to int
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const convertType_C = (data: string | number | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        // Validation
        if (description === "โอนเงิน" && !image) {
            setAlertMessage("กรุณาแนบหลักฐานการชำระเงิน");
            setError(true);
            return;
        }

        let data = {
            PaymentID: convertType(chk_payment.PaymentID),
            CHK_PaymentStatusID: convertType(chk_payment.CHK_PaymentStatusID),
            Date_time: chk_payment.Date_time,
            Amount: convertType(chk_payment.Amount),
            Description: chk_payment.Description,
            Picture: description === "เงินสด" ? null : image,
            EmployeeID: convertType_C(localStorage.getItem('id')),
        };

        console.log(data);

        let res = await CHK_Payments(data);
        if (res.status) {
            setAlertMessage("บันทึกรายการตรวจสอบการชำระเงินสำเร็จ");
            setSuccess(true);
            setInterval(() => {
                window.location.assign("/CPM");
            }, 2000);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }

    return (
        <Container maxWidth="xl"        
        sx={{
            height: '140vh',
    width: '100vw',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}>
        <Container maxWidth="md" sx={{ marginTop: 5 }}>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
            <Paper>
                <Box display="flex" sx={{ marginTop: 2 }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Typography component="h2" variant="h6"  gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ตรวจสอบการชำระเงิน
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>เลือกรายการการชำระเงิน</p>
                            <Select
                                native
                                value={chk_payment.PaymentID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PaymentID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกรายการชำระเงิน
                                </option>
                                {payments.map((item: PaymentsInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {"คุณ " + item.Member?.FirstName} {" -- " + item.Price}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>จำนวนเงินที่ชำระ</p>
                            <TextField
                                type="number"
                                value={chk_payment.Amount}
                                id="Amount"
                                variant="outlined"
                                inputProps={{
                                    name: "Amount",
                                }}
                                onChange={handleInputChange_Text}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>วิธีชำระเงิน</p>
                            <TextField
                                type="text"
                                value={chk_payment.Description}
                                id="Description"
                                variant="outlined"
                                inputProps={{
                                    name: "Description"
                                }}
                                onChange={handleInputChange_Text}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>วันที่ตรวจสอบการชำระเงิน</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    format="dd/MM/yyyy HH:mm"
                                    value={chk_payment.Date_time}
                                    onChange={(newValue) => {
                                        setCHK_Payment({
                                            ...chk_payment,
                                            Date_time: newValue,
                                        });
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>ผู้ตรวจสอบการชำระเงิน</p>
                            <TextField
                                fullWidth
                                disabled
                                id="OfficerID"
                                value={user?.Officername}
                            />
                        </FormControl>
                    </Grid>
                    {description !== "เงินสด" && (
                        <Grid item xs={6}>
                            <Typography gutterBottom></Typography>
                            <Grid container sx={{ flexGrow: 1 }}>
                                <FormControl fullWidth variant="outlined">
                                    <p>โปรดแนบหลักฐานการชำระเงิน</p>
                                    <img src={`${image}`} style={{ maxWidth: '80%', height: '80' }} />
                                    <input type="file" onChange={handleImageChange} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            component={RouterLink}
                            to="/CheckPay"
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

export default CHK_PaymentCreate;
