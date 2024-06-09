import React, { useEffect, useState, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Alert, Button, Container, Divider, FormControl, Grid, Paper, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { ServiceInterface, ServiceTypeInterface } from "../../models/IService";
import { CreateService, GetServiceType } from "./service/ServiceHttpClientService";

function ServiceCreate() {
    const [service, setService] = useState<ServiceInterface>({});
    const [services, setServicelist] = React.useState<ServiceInterface[]>([]);
    const [servicetype, setServiceType] = useState<ServiceTypeInterface[]>([]);
    const [message, setAlertMessage] = useState("");
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [number, setNumber] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof ServiceCreate;
    
        const { value } = event.target;
    
        setService({ ...service, [id]: value });
      };

      const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof service;
        setService({
          ...service,
          [name]: event.target.value,
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

    const getServiceType =  async () => {
        let res = await GetServiceType();
        if (res) {
            setServiceType(res);
        }
      };

      useEffect(() => {
        getServiceType();
      }, []);

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

      async function submit() {
        let data = {
            ServiceTypeID: service.ServiceTypeID,
            Service_Name: service.Service_Name,           
            Price: service.Price,

        };

        console.log(data)

        let res = await CreateService(data);
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
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
//     let data = {
//         ServiceTypeID: convertType(service.ServiceTypeID),
//         // EmployeeID: convertType(localStorage.getItem("id")),
//         Service_Name: service.Service_Name,
//         Price: service.Price,
//     };

//     const apiUrl = "http://localhost:8080/services";

//     const requestOptions = {
//       method: "POST",

//       headers:       
//       {  
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json" 
//       },

//       body: JSON.stringify(data),
//     };

//     fetch(apiUrl, requestOptions)
//       .then((response) => response.json())

//       .then((res) => {       
//         console.log(res)
//         if (res.data) {
//           setSuccess(true);
//           setInterval(() => {
//             window.location.assign("/Service");
//           }, 1000);
//         } else {
        
//           setError(true);
//           setAlertMessage(res.error);
//         }
//       });
//   }

    return(
        <Container maxWidth="md" sx = {{ marginTop: 5,}} >
      <Snackbar
        id="success"        
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar 
          id="error"   
          open={error} 
          autoHideDuration={6000} 
          onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ {message}
          </Alert>
        </Snackbar>
        <Paper>
            <Box display="flex" sx={{ marginTop: 2, }} >
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} >
                        เพิ่มข้อมูลบริการ
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>ประเภทบริการ</p>
                        <Select
                        native
                        value={service.ServiceTypeID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "ServiceTypeID",
                        }}
                        >
                        <option aria-label="None" value="">
                            กรุณาเลือกประเภทบริการ
                        </option>
                        {servicetype.map((item: ServiceTypeInterface) => (
                        <option value={item.ID}>{item.Name}</option>
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
                        variant="outlined"
                        value={service.Service_Name}
                        onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>ราคา</p>
                        <TextField
                        type="number"
                        variant="outlined"
                        value={service.Price}
                        onChange={handleInputChange}
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
    );
}
export default ServiceCreate;