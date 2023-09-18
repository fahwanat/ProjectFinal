import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

import { ServiceInterface } from "../../models/IService";

import { ButtonGroup, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { grey } from '@mui/material/colors';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import moment from "moment";
import { GetServices, Service, DeleteService } from "./service/ServiceHttpClientService";
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import React from "react";


function ServiceShow() {

  const [service, setService] = useState<ServiceInterface[]>([]);

  const id_mem = localStorage.getItem("id");

  const [success, setSuccess] = useState(false);
  const [successDel, setSuccessDel] = useState(false);
  const [error, setError] = useState(false);
  const [errorDel, setErrorDel] = useState(false);
  const [id, setId] = useState(0);

   //For Delete state 
   const [deleteID, setDeleteID] = React.useState<number>(0)

   // For Set dialog open
   const [openDelete, setOpenDelete] = React.useState(false);
 
   const handleDialogDeleteclose = () => {
     setOpenDelete(false)
     setTimeout(() => {
         setDeleteID(0)
     }, 500)
 }
 
 const handleDialogDeleteOpen = (ID: number) => {
   setDeleteID(ID)
   setOpenDelete(true)
 }
 
 const handleDelete = async () => {
   let res = await DeleteService(deleteID)
   if (res.status) {
    console.log(res.status)
   } else {
    console.log(res.status)
   }
   getList();
   setOpenDelete(false)
 
 }
 
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setSuccessDel(false);
    setError(false);
    setErrorDel(false);
  };

  const getList = async () => {
    let res = await GetServices();
    if (res) {
      setService(res);
    }
  };

  const onDelete = async (id: number) => {
    let res = await DeleteService(id);
    if (res) {
      setSuccessDel(true);
    } else {
      setErrorDel(true);
    }
    getList()
  }



 const columns: GridColDef[] = [

   //{ field: "Room_No", headerName: "หมายเลขห้อง", width: 120 , valueFormatter: (params) => params?.value?.Room_No,},
   
   //{ field: "Employee", headerName: "ชื่อ-นามสกุล", width: 150 , valueFormatter: (params) => params?.value?.Employeename,},

   //{ field: "RoomType", headerName: "ประเภทของห้อง", width: 150 , valueFormatter: (params) => params?.value?.Size,},

   //{ field: "RoomZone", headerName: "โซนของห้องพัก", width: 150 , valueFormatter: (params) => params?.value?.Name,},

   { field: "Name", headerName: "บริการ", width: 400 , valueFormatter: (params) => params?.value?.Name,},

   { field: "Price", headerName: "ราคา", width: 400 , valueFormatter: (params) => params?.value?.Price,},

   //{ field: "Time", headerName: "วันที่และเวลาที่บันทึกข้อมูล", width: 170, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm') },

   {
    field: "delete",
    headerName: "",
    sortable: true,
    width: 320,
    align:"center",
    headerAlign: "center",
    renderCell: ({ row }: Partial<GridRowParams>) =>
        <Button 
            size="small"
            //variant="contained"
            color="error"
            onClick={() => {
              //  onDelete(row.ID);
               handleDialogDeleteOpen(row.ID)
            }}
            
            sx={{borderRadius: 20,'&:hover': {color: '#FC0000', backgroundColor: '#F9EBEB'}}}
            endIcon={<DeleteOutlineIcon />}
        >
            DELETE
        </Button>,
  },
 ];

 useEffect(() => {
  getList();
}, []);


//  useEffect(() => {

//    getRooms();

//  }, []);


 return (
  <div>
      <Container maxWidth="lg">
        <Snackbar
          open={successDel}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            ลบข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorDel}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ไม่สามารถลบข้อมูลได้
          </Alert>
        </Snackbar>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เพิ่มข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ไม่สามารถเพิ่มข้อมูลได้
          </Alert>
        </Snackbar>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="grey"
              gutterBottom
            >
              ข้อมูลบริการ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/RT/Create"
              variant="contained"
              color="inherit"
            >
              เพิ่มข้อมูลบริการ
            </Button>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/RT/Edit"
              variant="contained"
              color="inherit"
            >
              แก้ไขข้อมูลบริการ
            </Button>
          </Box>
          </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={service}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" > 
                    {`คุณต้องการลบข้อมูลหมายเลขห้อง ${service.filter((service) => (service.ID === deleteID)).at(0)?.Name}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      ถ้าคุณลบข้อมูลนี้ คุณจะไม่สามารถกู้ข้อมูลคืนได้ คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                    <Button color="error" onClick={handleDelete} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
      </Container>
    </div>


   
 );

}


export default ServiceShow