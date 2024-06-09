import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { EmployeeInterface } from "../../models/IManage";
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { GetEmployeelist } from "../Technician/service/TechnicianHttpClientService";
import { DeleteService, GetService, GetServicelist, GetServiceType } from "./service/ServiceHttpClientService";
import { ServiceInterface, ServiceTypeInterface } from "../../models/IService";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { DeleteServices } from "../Payment/service/PaymentHttpClientService";

const themeshow = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[800],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#e8f5e9",
    },
  }
});


function ServiceShow() {

  const [service, setServicelist] = React.useState<ServiceInterface[]>([]);
  const [servicetype, setServiceType] = useState<ServiceTypeInterface[]>([]);  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [servicetypeid, setServicesTypesid] = useState(0);

  //For Delete state 
  const [deleteID, setDeleteID] = React.useState<number>(0)

  // For Set dialog open
  const [openDelete, setOpenDelete] = React.useState(false);
 
 const deleteEmployee = (id : number) => {
  
  const apiUrl = "http://localhost:8080/employees/"+id;
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then(async (res) => {
      if (res.data) {
        //setSuccess(true);
        //await timeout(1000); //for 1 sec delay 
        window.location.reload();

      } else {
        //setError(true);
      }
    });
}

const getservicelist = async () => {
  let res = await GetServicelist();
  if (res) {
      setServicelist(res);
  }
};

const getserviceType =  async () => {
  let res = await GetServiceType();
  if (res) {
      setServiceType(res);
  }
};

 useEffect(() => {
  //  getEmployee();
   getservicelist();
   getserviceType();

 }, []);

 const handleDialogDeleteOpen = (ID: number) => {
  setDeleteID(ID)
  setOpenDelete(true)
}

const getList = async () => {
  let res = await GetServicelist();
  if (res) {
    setServicelist(res);
  }
};

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

const handleDialogDeleteclose = () => {
  setOpenDelete(false)
  setTimeout(() => {
      setDeleteID(0)
  }, 500)
}

 const customStyles = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f0f0f0', // Change this color to your desired header background color
    color: '#000', // Change this to your desired header text color
    fontSize: '16px', // Adjust the font size if needed
    fontWeight: 'bold', // Make the text bold
  },
};

const columns: GridColDef[] = [

  { field: "ID", headerName: "ลำดับที่", width: 180, valueFormatter: (params) => params.value.Name, headerAlign: "center", align: "center", },
  { field: "Service_Name", headerName: "รายการบริการ", width: 250, valueFormatter: (params) => params.value.Service_Name, headerAlign: "center", align: "center", },
  // { field: "ServiceType", headerName: "ประเภทบริการ", width: 180, valueFormatter: (params) => params.value.Name, headerAlign: "center", align: "center", },
  { field: "Price", headerName: "ราคา", width: 200, valueFormatter: (params) => params.value.Price, headerAlign: "center", align: "center", },
  // { field: "ServiceType", headerName: "ประเภทบริการ", width: 180, valueFormatter: (params) => params.value.Name, headerAlign: "center", align: "center", },
  {
    field: "delete",
    headerName: "",
    sortable: true,
    width: 120,
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
            
        </Button>,
  },      
]

 return (
<ThemeProvider theme={themeshow}>
  <div>
  <Container maxWidth="md">
  <Box display="flex" sx={{ marginTop: 5, justifyContent: "center" }}>
    <Box flexGrow={1}>
      <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
          >
            ข้อมูลรายการบริการ
          </Typography>
    </Box>
    {/* <Box>
      <Button component={RouterLink} to="/Service/Create" variant="contained" color="primary">
        เพิ่มข้อมูลบริการ
      </Button>
    </Box> */}
    <Box>
      <Button component={RouterLink} to="/Service/Edit" variant="contained" color="primary">
        แก้ไขข้อมูลบริการ
      </Button>
    </Box>               
    <Box>

         {/* <Button 
            component={RouterLink}
            to="/Manage-Save"
            variant="contained"
            color="primary"
          >
            <Typography
              color="secondary"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Record Employee Information

            </Typography>
      </Button>*/}
        </Box>
      </Box>
        {/* <div>
          <Container maxWidth="md">
            <div style={{ height: 500, width: "100%", marginTop: "40px" }}>
              <TableContainer >
                <Table aria-label="simple table">
                <TableHead>
  <TableRow>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#f48fb1', color: 'black' }}> ลำดับที่ </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#f48fb1', color: 'black' }}> รายการบริการ </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#f48fb1', color: 'black' }}> ราคา </TableCell>
  </TableRow>
</TableHead>
  <TableBody style={{ marginLeft: "100px" }}>
  {service.map((item: ServiceInterface) => (
    <TableRow key={item.ID} >
      <TableCell align="center">{item.ID}</TableCell>
      <TableCell align="center">{item.Service_Name}</TableCell>
      <TableCell align="center">{item.Price}</TableCell>
      <TableCell align="center">
        <IconButton aria-label="delete">
          <DeleteIcon onClick={() => deleteEmployee(Number(item.ID))} />
        </IconButton>           
      </TableCell>
      <TableCell align="center">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            color="warning"
            component={RouterLink}
            to={`/ManageEdit/${item.ID}`}
          >
            Edit
          </Button>
        </ButtonGroup>      
      </TableCell>
    </TableRow>
  ))}
</TableBody>

                </Table>
              </TableContainer>
            </div>
          </Container>
        </div> */}
        <div style={{ height: 480, width: "100%", margin: "10px auto", display: "flex", justifyContent: "center" }}>
          <DataGrid rows={service} getRowId={(row) => row.ID} columns={columns} pageSize={5} rowsPerPageOptions={[5]} sx={customStyles} />
        </div>
        <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" > 
                    {`คุณต้องการลบข้อมูลรายการบริการที่ ${service.filter((service) => (service.ID === deleteID)).at(0)?.ID}?`}
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
</ThemeProvider>
 );

}


export default ServiceShow;