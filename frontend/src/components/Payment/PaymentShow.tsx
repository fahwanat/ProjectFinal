import { Box, ButtonGroup, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PaymentsInterface } from "../../models/IPayment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GetPayment } from "./service/PaymentHttpClientService";
import { tableCellClasses } from "@mui/material/TableCell";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { grey } from '@mui/material/colors';
import Button from "@mui/material/Button";
import moment from "moment";

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
    const id_cus = localStorage.getItem("id");
    const name = localStorage.getItem("name");

    const getpayment = async () => {
        let res = await GetPayment(id_cus + "");
        if (res) {
            setPayment(res);
        }
    };

    const TableCellHead = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#808080",
            color: theme.palette.common.white,
            // fontFamily: "Comic Sans MS",
            fontSize: 16,
        },
    }));
    const TableCellHeadY = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: "#FF7F00",
            color: theme.palette.common.white,
            // fontFamily: "Comic Sans MS",
            fontSize: 16,
        },
    }));

    const TableCellBody = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            backgroundColor: "#white",
            color: theme.palette.common.black,
            // fontFamily: "Comic Sans MS",
            fontSize: 12,
        },
    }));

    useEffect(() => {
        getpayment();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="lg"
                sx={{
                    width: "auto",
                    height: "auto",

                }}>
                <Paper
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
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Mathod </TableCellHead>
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Price </TableCellHead>
                                            <TableCellHead align="center" width="20%" sx={{ border: 1 }}> Slip </TableCellHead>
                                            {/* <TableCellHeadY align="center" width="20%" sx={{ border: 1 }}> Edit </TableCellHeadY> */}
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
                                                {/* <TableCellBody align="center">
                                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                        <Button
                                                            color="warning"
                                                            component={RouterLink}
                                                            to={`/pu/${item.ID}`}
                                                        >
                                                            <EditIcon /></Button>
                                                    </ButtonGroup>
                                                </TableCellBody> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </Paper>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default PaymentShow