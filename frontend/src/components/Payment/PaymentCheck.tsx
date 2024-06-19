import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { format } from 'date-fns';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CHK_PaymentsInterface } from "../../models/modelCHK_Payment/ICHK_Payment";
import { GetBookings, GetPayment, GetPayments } from "./service/PaymentHttpClientService";
import { PaymentsInterface } from "../../models/IPayment";
import { BookingsInterface } from "../../models/modelBooking/IBooking";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";

function PaymentCheck() {
    const [chk_payments, setCHK_Payments] = useState<CHK_PaymentsInterface[]>([]);

    const [payment, setPayment] = useState<PaymentsInterface[]>([]);
    const [payments, setPayments] = useState<PaymentsInterface[]>([]);
    const [bookings, setBookings] = useState<BookingsInterface[]>([]);

    const id_mem = localStorage.getItem("id");
    const name = localStorage.getItem("name");

    const getPayments = async () => {
        let res = await GetPayment();
        if (res) {
            setPayments(res);
        }
    };

    const getBookings = async () => {
        let res = await GetBookings();
        if (res) {
            setBookings(res);
        }
    };
    useEffect(() => {
        getPayments();
        getBookings();
        // getCHK_Payments();
    }, []);

    // const getCHK_Payments = async () => {
    //     let res = await GetCHK_Payments();
    //     if (res) {
    //         setCHK_Payments(res);
    //         console.log(res);
    //     }
    // };

    const TableCellBody = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            backgroundColor: "#white",
            // color: theme.palette.common.black,
            fontFamily: "Comic Sans MS",
            fontSize: 12,
        },
    }));

    const customStyles = {
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f0f0f0', // Change this color to your desired header background color
          color: '#000', // Change this to your desired header text color
          fontSize: '16px', // Adjust the font size if needed
          fontWeight: 'bold', // Make the text bold
        },
      };

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ลำดับ", width: 80, headerAlign: "center", align: "center", },
        { field: "Time", headerName: "วันที่ชำระเงิน", width: 150, valueFormatter: (params) => format(new Date(params.value), "dd-MM-yyyy"), headerAlign: "center", align: "center", },
        { field: "Method", headerName: "วิธีชำระเงิน", width: 150, valueFormatter: (params) => params.value.Name, headerAlign: "center", align: "center",},
        { field: "Price", headerName: "จำนวนเงินที่ชำระ", width: 160, valueFormatter: (params) => Math.floor(params.value * 0.5), headerAlign: "center", align: "center",},
        { field: "Member", headerName: "ชำระเงินโดย", width: 150, valueFormatter: (params) => params.value.FirstName, headerAlign: "center", align: "center",},
        { field: "Picture", headerName: "หลักฐานการชำระเงิน", width: 180, renderCell: (params) => <TableCellBody align="center"><img src={`${params.value}`} alt=" Slip" width="70" height="90" /></TableCellBody>},  
  
    ]

    return (
        <div>
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
            <Container maxWidth="md" sx = {{ marginTop: 10,}}>
                <Box display="flex" sx={{ marginTop: 2, }}>
                    <Box flexGrow={1}>
                        <Typography component="h2" variant="h6"  gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ข้อมูลการชำระเงินค่ามัดจำของลูกค้า
                        </Typography>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/CPM/Create" variant="contained" color="primary">
                            ตรวจสอบการชำระเงิน
                        </Button>
                    </Box>
                    {/* <Box>
                        <Button component={RouterLink} to="/CPM/Edit" variant="contained" color="warning">
                            แก้ไขการตรวจสอบการชำระเงิน
                        </Button>
                    </Box> */}
                </Box>
                <Paper>
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid rows={payments} getRowId={(row) => row.ID} columns={columns} pageSize={5} rowsPerPageOptions={[5]} sx={customStyles}/>
                </div>
                </Paper>
            </Container>
            </Container>
        </div>
    );
}
export default PaymentCheck;