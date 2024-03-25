import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { format } from 'date-fns';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { GetBookingsBYUID, GetMemberByUID} from "./services/BookingHttpClientService";
// import { GetService, GetServiceType ,GetPrice, GetTimeService } from "../Service/service/ServiceHttpClientService";
import { MemberInterface } from "../../models/modelMember/IMember";
// import { EmployeeInterface } from "../../models/IManage";
import { ServiceTypeInterface, ServiceInterface, TimeServiceInterface } from "../../models/IService";

function NewBookings() {
    const [bookings, setBookings] = useState<BookingsInterface[]>([]);
    const [members, setMembers] = useState<MemberInterface>();
    // const [employees, setEmployees] = useState<EmployeeInterface>();
    // const [servicetypes, setServiceTypes] = useState<ServiceTypeInterface[]>([]);
    // const [servicetypeid, setServicesTypesid] = useState('');
    const [services, setServices] = useState<ServiceInterface[]>([]);
    const [serviceid, setServicesid] = useState('');
    // const [timeservice, setTimeService] = useState<TimeServiceInterface[]>([]);
    // const [timeserviceid, setTimeServiceid] = useState('');
    // const [priceservice, setPriceService] = useState<number | null>(null);


    useEffect(() => {
        getBookings();
        getMember();
        // getEmployee();
        // getservice();
        // getservicetype();
        // gettimeservice();
        // getprice();

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

    const columns: GridColDef[] = [
        // { field: "New_Booking_Number", headerName: "เลขที่การจอง", width: 150 },
        { field: "ServiceType", headerName: "ประเภทบริการ", width: 180, valueFormatter: (params) => params.value.Name, },
        { field: "Service", headerName: "บริการ", width: 180, valueFormatter: (params) => params.value.Service_Name, },
        { field: "BookingDate", headerName: "วันที่", width: 180, valueFormatter: (params) => format(new Date(params.value), "dd-MM-yyyy"), },
        { field: "TimeService", headerName: "เวลาบริการ", width: 180, valueFormatter: (params) => params.value.Start_End, },
        // { field: "Price", headerName: "ราคา", width: 180, item.Service.Price} },
        //{ field: "Total", headerName: "ราคาต่อวัน(บาท)", width: 100 },
        //{ field: "Price", headerName: "ราคา", width: 150, valueFormatter: (params) => params.value.Price, },
        { field: "Employee", headerName: "ช่าง", width: 190, valueFormatter: (params) => params.value.Employeename, },
        { field: "Member", headerName: "จองโดย", width: 180, valueFormatter: (params) => params.value.FirstName, },
        // { field: "Price", headerName: "คิดเป็นเงิน(บาท)", width: 150 , valueFormatter:(params) => params.value.Service.Price},
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
                        <Button component={RouterLink} to="/Payment/Create" variant="contained" color="primary">
                            ชำระค่ามัดจำ
                        </Button>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/Book/Appointment/1" variant="contained" color="primary">
                            ย้อนกลับ
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