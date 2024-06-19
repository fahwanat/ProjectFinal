import React, { useEffect, useState, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Alert, Button, Container, Divider, FormControl, Grid, Paper, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { GetService, GetServicelist, GetServices, UppdateService } from "./service/ServiceHttpClientService";
import { ServiceInterface } from "../../models/IService";

function ServiceEdit() {
    const [service, setService] = useState<Partial<ServiceInterface>>({});
    const [services, setServicelist] = React.useState<ServiceInterface[]>([]);

    const [message, setAlertMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
        const name = event.target.name as keyof typeof service;
        setService({
            ...service,
            [name]: event.target.value,
        });
    };

    const handleSuccess = () => {
        const shouldConfirm = window.confirm('คุณแน่ใจแล้วหรือไม่ว่าจะแก้ไขการตรวจสอบการชำระเงิน');
        if (shouldConfirm) {
            submit();
        }
    };

    const onChangeU_Service = async (event: SelectChangeEvent) => {
        let res = await GetServices(event.target.value);
        console.log(res);
        if (res) {
            setService(res);
        }
    };

    const handleInputChange_Text = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
        const id = event.target.id as keyof typeof ServiceEdit;
        const { value } = event.target;
        setService({ ...service, [id]: value, });
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const getservicelist = async () => {
        let res = await GetServicelist();
        if (res) {
            setServicelist(res);
        }
      };

      useEffect(() => {
        getservicelist();
    }, );

    async function submit() {
        let data = {
            ID: convertType(service.ID),
            Service_Name: service.Service_Name,           
            Price: convertType(service.Price),

        };

        console.log(data)

        let res = await UppdateService(data);
        if (res.status) {
            setAlertMessage("แก้ไขรายการตรวจสอบการชำระเงินสำเร็จ");
            setSuccess(true);
            setInterval(() => {
                window.location.assign("/Service");
            }, 2000);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }
    // function submit() {
    //     // let data = {
    //     //   Comment: review.Comment ?? "",
    //     //   Star: start,
    //     //   Reviewdate: reviewdate,
    //     //   Reviewimage: imageString,
    //     //   MemberID: user?.ID ?? "",
    //     //   SystemworkID: Number(review.SystemworkID),
    //     // };
    
    //     // const apiUrl = "http://localhost:8080/Reviews";
    
    //     // const requestOptions = {
    //     //   method: "POST",
    
    //     //   headers: {
    //     //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     //     "Content-Type": "application/json",
    //     //   },
    
    //     //   body: JSON.stringify(data),
    //     // };
    
    //     // fetch(apiUrl, requestOptions)
    //     //   .then((response) => response.json())
    
    //     //   .then((res) => {
    //     //     console.log(res)
    //     //     if (res.data) {
    //     //       window.location.reload();
    //     //       setSuccess(true);
    //     //     } else {
    //     //       setError(true);
    //     //       setAlertMessage(res.error);
    //     //     }
    //     //   });
    //   }

    return(
        <Container maxWidth="xl"        sx={{
            height: '91.35vh',
    width: '100vw',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}>
        <Container maxWidth="md" sx = {{ marginTop: 10,}} >
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
                    <Typography component="h2" variant="h6"  gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        แก้ไขข้อมูลบริการ
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>รายการบริการ</p>
                        <Select
                        native
                        value={service.ID + ""}
                        onChange={onChangeU_Service}
                        inputProps={{
                            name: "ID",
                        }}
                    >
                        <option aria-label="None" value="">
                            กรุณาเลือกรายการบริการ
                        </option>
                        {services.map((item:ServiceInterface) => (
                       <option value={item.ID} key={item.ID}>
                        {item.Service_Name} </option>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>ชื่อบริการ </p>
                        <TextField
                        id="Service_Name"
                        variant="outlined"
                        value={service.Service_Name}
                        InputProps={{
                            name: "Service_Name",
                        }}
                        onChange={handleInputChange_Text}
                        />
                    </FormControl>
                </Grid>
                
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>ราคา</p>
                        <TextField
                        type="number"
                        // value={number}
                        id="Price"
                        variant="outlined"
                        value={service.Price}
                        InputProps={{
                            name: "Price",
                        }}
                        onChange={handleInputChange_Text}
                        // onChange={(e)=>setNumber(e.target.value)} 
                        />
                    </FormControl>
                </Grid>
                           
                <Grid item xs={12}>
                    <Button
                        component={RouterLink}
                        to="/Service"
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
export default ServiceEdit;