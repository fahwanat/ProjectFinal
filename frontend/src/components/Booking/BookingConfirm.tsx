import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { format, set } from 'date-fns';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { GetBookingsBYUID, GetMemberByUID} from "./services/BookingHttpClientService";
// import { GetService, GetServiceType ,GetPrice, GetTimeService } from "../Service/service/ServiceHttpClientService";
import { MemberInterface } from "../../models/modelMember/IMember";
// import { EmployeeInterface } from "../../models/IManage";
import { ServiceTypeInterface, ServiceInterface, TimeServiceInterface } from "../../models/IService";
import { FormControl, FormLabel, Grid, InputBase, Paper, Select, SelectChangeEvent, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { EmployeeInterface } from "../../models/IManage";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { GetService, GetServiceType, GetTimeService } from "../Service/service/ServiceHttpClientService";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  

function BookingConfirm() {

    let { id } = useParams();
    
    const [booking, setBooking] = useState<BookingsInterface>({});
    const [bookingId, setBookingId] = useState(0);
    const [members, setMembers] = useState<MemberInterface>();
    const [employees, setEmployees] = useState<Partial<EmployeeInterface>>({});
    const [employeeId, setEmployeeId] = useState(0);
    
    const [servicetypes, setServiceTypes] = useState<ServiceTypeInterface[]>([]);
    const [servicetypeId, setServicesTypesId] = useState(0);
    const [services, setServices] = useState<ServiceInterface[]>([]);
    const [serviceId, setServicesId] = useState(0);
    const [timeservice, setTimeService] = useState<TimeServiceInterface[]>([]);
    const [timeserviceid, setTimeServiceId] = useState(0);
    const [priceservice, setPriceService] = useState<number | null>(null);
    const [BookingDate, setBookingDate] = React.useState<Dayjs | null>(dayjs());
    const [maxBookingDate, setMaxBookingDay] = useState(dayjs().add(2, 'day'))

    

    const feachBookingID = async () => {
        fetch(`${apiUrl}/bookings/${id}`, requestOptionsGet)
            .then((response) => response.json())
            .then((result) => {
                if (result.data) {
                    setBooking(result.data);
                    // console.log("services:",result.data );
                    setBookingId(result.data.ID)
                    // setServices(result.data.ServiceType.Service)
                }
            });
          };

    const apiUrl = "http://localhost:8080";
      const requestOptionsGet = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
      
      const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof booking;
    
        const { value } = event.target;
    
        setBooking({ ...booking, [id]: value });
      };
    
      
    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof booking;
        console.log(event.target.name);
        console.log(event.target.value);
        
        setBooking({
          ...booking,
          [name]: event.target.value,
        });
        console.log(booking);
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

    useEffect(() => {
        getBookings();
        getMember();
        feachBookingID();
        
    }, []);

    const getBookings = async () => {
        let res = await GetBookingsBYUID();
        if (res) {
            setBooking(res);
        }
    };
    
    const getMember = async() => {
        let res = await GetMemberByUID();
        if (res) {
            setMembers(res);
        }
    }

    // const getservicetype = async () => {
    //     let res = await GetServiceType();
    //     if (res) {
    //         setServiceTypes(res);
    //     }
    // };
    // const getservice = async () => {
    //     let res = await GetService(servicetypeId);
    //     if (res) {
    //         setServices(res);
    //     }
    // };
    // const gettimeservice = async () => {
    //     let res = await GetTimeService(serviceId);
    //     if (res) {
    //         setTimeService(res);
    //     }
    // };
    // const getprice = async () => {
    //     let res = await GetPrice(serviceid);
    //     if (res) {
    //         setPriceService(res);
    //     }
    // }

    
    return (
            <Container maxWidth="md">
                <Box display="flex" sx={{ marginTop: 5, }}>
                    <Box flexGrow={1}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            ข้อมูลการจองคิวของคุณ {members?.FirstName} {members?.LastName}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                m: 1,
                                width: 500,
                                height: 650,
                                },
                            }}
                        >
                            <Paper>
                            <Grid container spacing={1} sx={{ padding: 1 }}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ข้อมูลประเภทบริการ</p>
                            <Select
                                // disabled
                                id="ServiceType"
                                native
                                value={booking.ServiceTypeID + ""}
                                onChange={handleChange}
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
                            value={booking.Employee}
                            onChange={handleInputChange}
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
                    </Grid>
                                
                            </Paper>
                        </Box>                                           
                    </Box>
                </Box>
                
            </Container>
    );
}
export default BookingConfirm;