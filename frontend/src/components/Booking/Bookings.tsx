import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { format } from 'date-fns';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { GetBookingsBYUID, GetMemberByUID, GetEmployees } from "./services/BookingHttpClientService";
import { GetServices } from "../Service/service/ServiceHttpClientService";
import { MemberInterface } from "../../models/modelMember/IMember";
import { EmployeeInterface } from "../../models/IManage";
import { ServiceInterface } from "../../models/IService";

function NewBookings() {
    const [bookings, setBookings] = useState<BookingsInterface[]>([]);
    const [members, setMembers] = useState<MemberInterface>();
    const [employees, setEmployees] = useState<EmployeeInterface>();
    const [services, setServices] = useState<ServiceInterface>();


    useEffect(() => {
        getBookings();
        getMember();
        getEmployee();
        getService();

    }, []);

    const getBookings = async () => {
        let res = await GetBookingsBYUID();
        if (res) {
            setBookings(res);
        }
    };
    
    const getMember = async() => {
        let res = await GetMemberByUID();
        if (res) {
            setMembers(res);
        }
    }

    const getEmployee = async() => {
        let res = await GetEmployees();
        if (res) {
            setEmployees(res);
        }
    }

    const getService = async() => {
        let res = await GetServices();
        if (res) {
            setServices(res);
        }
    }

    const columns: GridColDef[] = [
        // { field: "New_Booking_Number", headerName: "เลขที่การจอง", width: 150 },
        //{ field: "Branch", headerName: "สาขา", width: 150, valueFormatter: (params) => params.value.B_name, },
        { field: "Service", headerName: "บริการ", width: 180, valueFormatter: (params) => params.value.Name, },
        { field: "BookingDate", headerName: "วันที่", width: 180, valueFormatter: (params) => format(new Date(params.value), "dd-MM-yyyy"), },
        { field: "TimeBooking", headerName: "บริการ", width: 180, valueFormatter: (params) => params.value.Start_End, },
        //{ field: "Total", headerName: "ราคาต่อวัน(บาท)", width: 100 },
        //{ field: "Start", headerName: "วันที่เริ่มเข้าพัก", width: 150, valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"), },
        //{ field: "Stop", headerName: "วันที่สิ้นสุดการเข้าพัก", width: 150, valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"), },
        //{ field: "Num_Of_Day", headerName: "รวมเป็น(วัน)", width: 100 },
        //{ field: "Price", headerName: "ราคา", width: 150, valueFormatter: (params) => params.value.Price, },
        { field: "Employee", headerName: "ช่าง", width: 190, valueFormatter: (params) => params.value.Employeename, },
        { field: "Member", headerName: "จองโดย", width: 180, valueFormatter: (params) => params.value.FirstName, },
        //{ field: "Price", headerName: "คิดเป็นเงิน(บาท)", width: 150 },
    ]

    return (
            <Container maxWidth="md">
                <Box display="flex" sx={{ marginTop: 5, }}>
                    <Box flexGrow={1}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            ข้อมูลการจองคิวของคุณ {members?.FirstName}
                        </Typography>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/Book/Create" variant="contained" color="primary">
                            จองคิว
                        </Button>
                    </Box>
                    {/* <Box>
                        <Button component={RouterLink} to="/Book/Edit" variant="contained" color="warning">
                            แก้ไขการจอง
                        </Button>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/Book/Delete" variant="contained" color="error">
                            ยกเลิกการจอง
                        </Button>
                    </Box> */}
                </Box>
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid rows={bookings} getRowId={(row) => row.ID} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                </div>
            </Container>
    );
}

export default NewBookings;