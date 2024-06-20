import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { MemberInterface } from "../../models/modelMember/IMember";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { ListItem, ListItemText } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  GetBookingsBYUID,
  GetMemberByUID,
  DeleteBookingConfirm,
} from "./services/BookingHttpClientService";
import dayjs  from "dayjs";

const FullScreenContainer = styled("div")({
  height: "80vw",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage:
    "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
});

function SelectTechByHair() {
  const [bookings, setBookings] = useState<BookingsInterface[]>([]);
  const [members, setMembers] = useState<MemberInterface>();
  const [filter, setFilter] = useState(bookings);

  //For Delete state
  const [deleteID, setDeleteID] = useState<number>(0);
  // For Set dialog open
  const [openDelete, setOpenDelete] = useState(false);
  // For Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getBookings();
    getMember();
  }, []);

  const handleDialogDeleteOpen = (ID: number) => {
    setDeleteID(ID);
    setOpenDelete(true);
  };

  const handleDialogDeleteClose = () => {
    setOpenDelete(false);
    setTimeout(() => {
      setDeleteID(0);
    }, 500);
  };

  const handleDelete = async () => {
    let res = await DeleteBookingConfirm(deleteID);
    if (res.status) {
      console.log(res.status);
      setOpenSnackbar(true); // Show Snackbar
    } else {
      console.log(res.status);
    }
    setOpenDelete(false);
    getBookings();
  };

  const getBookings = async () => {
    let res = await GetBookingsBYUID();
    if (res) {
      setBookings(res);
      setFilter(res);
    }
  };

  const getMember = async () => {
    let res = await GetMemberByUID();
    if (res) {
      setMembers(res);
    }
  };

  useEffect(() => {
    const NewFilter = bookings.filter((booking) => {
      return [];
    });
    setFilter(NewFilter);
  }, [bookings]);

  return (
    <FullScreenContainer>
      <Container maxWidth="md" sx={{ marginTop: 2, justifyContent: "center" }}>
        <Box flexGrow={1} sx={{ marginTop: 3 }} textAlign={"center"}>
          <Typography
            component="h2"
            variant="h6"
            gutterBottom
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            ข้อมูลการจองคิวของคุณ {members?.FirstName}
          </Typography>
        </Box>
        <Stack direction="row" sx={{ marginTop: 2, marginBottom: 2 }}>
          <Button
            variant="contained"
            color="success"
            component={RouterLink}
            to="/SelectService"
          >
            เพิ่มบริการ
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/Payment/Create"
            sx={{ marginLeft: 1 }}
          >
            ชำระค่ามัดจำ
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {filter.map((row, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 300,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md container>
                    <Grid item xs>
                      <ListItem>
                        <ListItemText
                          primary={`บริการที่จอง: ${row.Service?.Service_Name}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`ช่างที่จอง: ${row.Employee?.Employeename}`}
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemText
                          primary={`วันที่จอง : ${dayjs(row.BookingDate).format(
                            "DD-MM-YYYY"
                          )}`}
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemText
                          primary={`เวลาที่จอง: ${row.TimeService?.Start_End}`}
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemText primary={`ราคา: ${row.Total} บาท`} />
                      </ListItem>
                      <IconButton
                        aria-label="delete"
                        style={{ float: "right" }}
                        onClick={() => handleDialogDeleteOpen(Number(row.ID))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={openDelete}
          onClose={handleDialogDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`คุณต้องการลบข้อมูลรายการบริการหรือไม่ ?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ถ้าคุณลบข้อมูลนี้ คุณจะไม่สามารถกู้ข้อมูลคืนได้
              คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={handleDialogDeleteClose}>
              ยกเลิก
            </Button>
            <Button color="error" onClick={handleDelete} autoFocus>
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            ลบข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
      </Container>
    </FullScreenContainer>
  );
}

export default SelectTechByHair;
