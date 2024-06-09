import { Box, ButtonGroup, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PaymentsInterface } from "../../models/IPayment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GetBookings, GetPayment, GetPayments } from "./service/PaymentHttpClientService";
import { tableCellClasses } from "@mui/material/TableCell";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { grey } from '@mui/material/colors';
import Button from "@mui/material/Button";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { BookingsInterface} from "../../models/modelBooking/IBooking";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[800],
        },
        secondary: {
            main: grey[50],
        },
    },
});


function PaymentShow() {
    const [payment, setPayment] = useState<PaymentsInterface[]>([]);
    const [payments, setPayments] = useState<PaymentsInterface[]>([]);
    const [bookings, setBookings] = useState<BookingsInterface[]>([]);

    const id_mem = localStorage.getItem("id");
    const name = localStorage.getItem("name");

    // const getpayment = async () => {
    //     let res = await GetPayment(id_mem + "");
    //     if (res) {
    //         setPayment(res);
    //     }
    // };

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
    const TableCellHead = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#808080",
            color: theme.palette.common.white,
            fontFamily: "Comic Sans MS",
            fontSize: 16,
        },
    }));
    const TableCellHeadY = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#FF7F00",
            color: theme.palette.common.white,
            fontFamily: "Comic Sans MS",
            fontSize: 16,
        },
    }));

    const TableCellBody = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            backgroundColor: "#white",
            color: theme.palette.common.black,
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
        // { field: "Time", headerName: "วันที่ชำระเงิน", width: 180, valueFormatter: (params) => format(new Date(params.value), "dd-MM-yyyy"), },
        // { field: "Method", headerName: "วิธีชำระเงิน", width: 180, valueFormatter: (params) => params.value.Name, },
        // { field: "Price", headerName: "จำนวนเงินที่ชำระ", width: 180, valueFormatter: (params) => Math.floor(params.value * 0.5), },
        // { field: "Member", headerName: "ชำระเงินโดย", width: 180, valueFormatter: (params) => params.value.FirstName, },
        // { field: "Picture", headerName: "รูปภาพ", width: 180, renderCell: (params) => <TableCellBody align="center"><img src={`${params.value}`} alt=" Slip" width="70" height="90" /></TableCellBody>},  
  
        {
            field: "Member",
            headerName: "ลูกค้า",
            width: 150,
            renderCell: (params) => (
                    <Button color="primary" component={RouterLink} to={`/Payment-Edit/${params.row.MemberID}`}>
                        {params.value.FirstName}
                    </Button>
            ),
            headerAlign: "center", align: "center",
        },        
        { field: "BookingDate", headerName: "วันที่จอง", width: 160, valueFormatter: (params) => format(new Date(params.value), "dd-MM-yyyy"), headerAlign: "center", align: "center",},
        { field: "Service", headerName: "บริการ", width: 170, valueFormatter: (params) => params.value.Service_Name, headerAlign: "center", align: "center",},
        // { field: "Service", headerName: "บริการ", width: 180, valueFormatter: (params) => params.value.Service_Name, },
        { field: "TimeService", headerName: "เวลา", width: 180, valueFormatter: (params) => params.value.Start_End, headerAlign: "center", align: "center",},
        { field: "Employee", headerName: "ช่างที่บริการ", width: 190, valueFormatter: (params) => params.value.Employeename, headerAlign: "center", align: "center",},
        // { field: "Total", headerName: "จำนวนเงิน", width: 180, valueFormatter: (params) => params.value.Price, },
        // { field: "Price", headerName: "ราคา", width: 180, item.Service.Price} },
        //{ field: "Total", headerName: "ราคาต่อวัน(บาท)", width: 100 },
        // { field: "Price", headerName: "ราคา", width: 150, valueFormatter: (params) => params.value.Price, },
                   
        // {
        //     field: " ",
        //     // headerName: "แก้ไข",
        //     width: 120,
        //     renderCell: (params) => (
        //         <Button
        //             variant="text"
        //             color="warning"
        //             component={RouterLink}
        //             to={`/Payment-Edit/${params.row.ID}`}
        //         >
        //             แก้ไข
        //         </Button>
        //     ),
        // },

        // {
        //     field: "   ",
        //     // headerName: "แก้ไข",
        //     width: 150,
        //     renderCell: (params) => (
        //         <Button
        //             variant="contained"
        //             color="primary"
        //             component={RouterLink}
        //             to={`/Payment/${params.row.ID}`}
        //         >
        //             ชำระเงิน
        //         </Button>
        //     ),
        // },

        //{ field: "Total", headerName: "ราคาต่อวัน(บาท)", width: 100 },
        //{ field: "Price", headerName: "ราคา", width: 150, valueFormatter: (params) => params.value.Price, },
        // { field: "Employee", headerName: "ช่าง", width: 190, valueFormatter: (params) => params.value.Employeename, },
        // { field: "Member", headerName: "จองโดย", width: 180, valueFormatter: (params) => params.value.FirstName, },
        // { field: "Price", headerName: "คิดเป็นเงิน(บาท)", width: 150 , valueFormatter:(params) => params.value.Service.Price},
    ]

    useEffect(() => {
        // getpayment();
        getPayments();
        getBookings();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="md"
                sx={{
                    width: "auto",
                    height: "auto",
                    justifyContent: "center"

                }}>
                                    <Box display="flex" sx={{ marginTop: 5, }}>
                    <Box flexGrow={1} textAlign={"center"}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ข้อมูลการจองคิวของลูกค้า
                        </Typography>
                    </Box>
                    {/* <Box>
                        <Button component={RouterLink} to="/Payment/Create" variant="contained" color="primary">
                            ชำระค่ามัดจำ
                        </Button>
                    </Box> */}
                    {/* <Box>
                        <Button component={RouterLink} to="/Payment" variant="contained" color="primary">
                            ชำระเงิน
                        </Button>
                    </Box> */}
                </Box>
                {/* <Paper
                    elevation={3}
                    sx={{
                        bgcolor: "#CDCDCDCD",
                        padding: 2,
                        marginBottom: 2,
                        boxShadow: 1,
                        marginTop: 4,
                    }}
                >
                    <Paper
                        sx={{
                            bgcolor: "#white",
                            padding: 2,
                            marginBottom: 1,
                            boxShadow: 1,
                            marginTop: 0.5,
                        }}
                    >
                        <Container maxWidth="xl">
                            <Box
                                sx={{
                                    padding: 3,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        float: "right",
                                        flexGrow: 1,
                                        fontFamily: "Comic Sans MS",
                                    }}
                                    gutterBottom
                                >
                                    {name}'s Bill Payment
                                </Typography>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 500 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Payment </TableCellHead>
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Slip Time </TableCellHead>
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Method  </TableCellHead>
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Price </TableCellHead>
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Slip </TableCellHead>
                                            <TableCellHeadY align="center" width="20%" sx={{ border: 1 }}> Edit </TableCellHeadY>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {payment.map((item: PaymentsInterface) => (
                                            <TableRow key={item.ID}>
                                                <TableCellBody align="center">{item.ID}</TableCellBody>
                                                <TableCellBody align="center">{moment(item.Time).format("DD/MM/YYYY HH:mm:ss")}</TableCellBody>
                                                <TableCellBody align="center">{item.Method?.Name}</TableCellBody>
                                                <TableCellBody align="center">{item.Price}</TableCellBody>
                                                <TableCellBody align="center"><img src={`${item.Picture}`} width="70" height="90" /></TableCellBody>
                                                <TableCellBody align="center">
                                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                        <Button
                                                            color="warning"
                                                            component={RouterLink}
                                                            to={`/pu/${item.ID}`}
                                                        >
                                                            <EditIcon /></Button>
                                                    </ButtonGroup>
                                                </TableCellBody>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </Paper>
                </Paper> */}
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid rows={bookings} getRowId={(row) => row.ID} columns={columns} pageSize={5} rowsPerPageOptions={[5]} sx={customStyles} />
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default PaymentShow