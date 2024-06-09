import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { format } from 'date-fns';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CHK_PaymentsInterface } from "../../models/modelCHK_Payment/ICHK_Payment";
import { GetCHK_Payments } from "./services/CHK_PaymentHttpClientService";
import styled from "@emotion/styled";

function CHK_Payments() {
    const [chk_payments, setCHK_Payments] = useState<CHK_PaymentsInterface[]>([]);

    useEffect(() => {
        getCHK_Payments();
    }, []);

    const getCHK_Payments = async () => {
        let res = await GetCHK_Payments();
        if (res) {
            setCHK_Payments(res);
            console.log(res);
        }
    };

    const TableCellBody = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            backgroundColor: "#white",
            // color: theme.palette.common.black,
            fontFamily: "Comic Sans MS",
            fontSize: 12,
        },
    }));

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ลำดับ", width: 100 },
        { field: "Payment", headerName: "รายการชำระเงิน", width: 150, valueFormatter: (params) => params.value.ID }, //อาจมีการแก้ไข
        { field: "CHK_PaymentStatus", headerName: "สถานะการชำระเงิน", width: 280, valueFormatter: (params) => params.value.Type },
        { field: "Date_time", headerName: "วัน-เวลาที่ชำระเงิน", width: 220, valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy HH:mm:ss"), },
        { field: "Amount", headerName: "จำนวนเงินที่ชำระ", width: 180 },
        { field: "Description", headerName: "วิธีชำระเงิน", width: 220 },
        {
            field: "Picture", headerName: "หลักฐานการชำระเงิน", width: 180,
            renderCell: (params) => (
                params.row.Description === "โอนเงิน" && params.value ? (
                    <TableCellBody align="center">
                        <img src={`${params.value}`} alt="Slip" width="70" height="90" />
                    </TableCellBody>
                ) : null
            )
        },
        // { field: "Employee", headerName: "ตรวจสอบโดย", width: 250,  valueFormatter: (params) => params.value.Employeename},
    ]

    return (
        <div>
            <Container maxWidth="xl" sx = {{ marginTop: 5,}}>
                <Box display="flex" sx={{ marginTop: 2, }}>
                    <Box flexGrow={1}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ข้อมูลการตรวจสอบการชำระเงิน
                        </Typography>
                    </Box>
                    {/* <Box>
                        <Button component={RouterLink} to="/CPM/Create" variant="contained" color="primary">
                            ตรวจสอบการชำระเงิน
                        </Button>
                    </Box> */}
                    <Box>
                        <Button component={RouterLink} to="/CPM/Edit" variant="contained" color="primary">
                            แก้ไขการตรวจสอบการชำระเงิน
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid rows={chk_payments} getRowId={(row) => row.ID} columns={columns} pageSize={5} rowsPerPageOptions={[5]}/>
                </div>
            </Container>
        </div>
    );
}
export default CHK_Payments;