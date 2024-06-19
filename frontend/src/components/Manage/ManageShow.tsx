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

import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { GetEmployeelist } from "../Technician/service/TechnicianHttpClientService";
import { DeleteEmployees, Getlist } from "./service/ManageHttpClientService";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import format from "date-fns/format";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";

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


function ManageShow() {

  const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
  const id_officer = localStorage.getItem("id");
  const [employeelist, setEmployeelist] = React.useState<EmployeeInterface[]>([]);

   //For Delete state 
   const [deleteID, setDeleteID] = React.useState<number>(0)

   // For Set dialog open
   const [openDelete, setOpenDelete] = React.useState(false);

//  const getEmployee = async () => {
//    const apiUrl = `http://localhost:8080/Employees/officer/${id_officer}`;
//    const requestOptions = {
//      method: "GET",
//      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
//    };


//    fetch(apiUrl, requestOptions)
//      .then((response) => response.json())
//      .then((res) => {
//        console.log(res.data);
//        if (res.data) {
//         setEmployee(res.data);
//        }
//      });
//  };

 const deleteEmployee = (id : number) => {
  
  const apiUrl = "http://localhost:8080/Employees/"+id;
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

const handleDialogDeleteOpen = (ID: number) => {
  setDeleteID(ID)
  setOpenDelete(true)
}

const getList = async () => {
  let res = await Getlist();
  if (res) {
    setEmployeelist(res);
  }
};

const handleDelete = async () => {
  let res = await DeleteEmployees(deleteID)
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

const getemployeelist = async () => {
  let res = await Getlist();
  if (res) {
      setEmployeelist(res);
  }
};

 useEffect(() => {
  //  getEmployee();
   getemployeelist();
 }, []);

 const customStyles = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f0f0f0', // Change this color to your desired header background color
    color: '#000', // Change this to your desired header text color
    fontSize: '16px', // Adjust the font size if needed
    fontWeight: 'bold', // Make the text bold
  },
};

 const columns: GridColDef[] = [
  { field: "ID", headerName: "ลำดับ", width: 70, valueFormatter: (params) => params.value.ID, headerAlign: "center", align: "center",},
  { field: "PersonalID", headerName: "เลขประจำตัวประชาชน", width: 170, valueFormatter: (params) => params.value.PersonalID, headerAlign: "center", align: "center",},
  { field: "Employeename", headerName: "ชื่อ-นามสกุล", width: 190, valueFormatter: (params) => params.value.Employeename, headerAlign: "center", align: "center",},
  { field: "Position", headerName: "ตำแหน่ง", width: 140, valueFormatter: (params) => params.value.Name, headerAlign: "center", align: "center",},
  { field: "Tusername", headerName: "ชื่อผู้ใช้งาน", width: 130, valueFormatter: (params) => params.value.Tusername, headerAlign: "center", align: "center",},
  { field: "Email", headerName: "อีเมล", width: 200, valueFormatter: (params) => params.value.Email, headerAlign: "center", align: "center",},
  { field: "Phonenumber", headerName: "หมายเลขติดต่อ", width: 140, valueFormatter: (params) => params.value.Phonenumber, headerAlign: "center", align: "center",},
  { field: "Salary", headerName: "เงินเดือน", width: 100, valueFormatter: (params) => params.value.Salary, headerAlign: "center", align: "center",},
  { field: "Gender", headerName: "เพศ", width: 90, valueFormatter: (params) => params.value.Gender, headerAlign: "center", align: "center",},          
  {
      field: " ",
      // headerName: "แก้ไข",
      width: 80,
      renderCell: (params) => (
          <Button
              variant="text"
              color="warning"
              component={RouterLink}
              to={`/Manage-Edit/${params.row.ID}`}
          >
              แก้ไข
          </Button>
      ),
  },

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

 return (
  <div> 
  <Container maxWidth="xl"        sx={{
            height: '91.35vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}>
  <Container maxWidth="xl">
  <Box display="flex" sx={{ marginTop: 5, justifyContent: "center" }}>
    <Box flexGrow={1} >
      <Typography
            component="h2"
            variant="h6"
            // color="primary"
            gutterBottom
            sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
          >
            ข้อมูลพนักงาน
          </Typography>
    </Box>
    <Box>
                        <Button component={RouterLink} to="/Manage-Save" variant="contained" color="primary">
                            เพิ่มข้อมูลพนักงาน
                        </Button>
                    </Box>
        {/* <Box>
         <Button 
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
      </Button>
        </Box> */}
      </Box>
  {/* <Box
        display="flex"
        sx={{
          marginTop: 3.5,
        }}
      >
        <Box flexGrow={1}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            Employee data table
          </Typography>
        </Box>

        <Box>

         <Button 
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
              เพิ่มข้อมูล

            </Typography>
      </Button>
        </Box>
      </Box> */}
        {/* <div>
          <Container maxWidth="xl">
            <div style={{ height: 500, width: "100%", marginTop: "15px" }}>
              <TableContainer >
                <Table aria-label="simple table">
                <TableHead>

  <TableRow>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Personal ID </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Name </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Position </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Username </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Email </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Tel </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Salary </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Gender </TableCell>
    <TableCell align="center" width="20%" style={{ backgroundColor: '#333333', color: 'white' }}> Actions </TableCell>
  </TableRow>
</TableHead>

                  <TableBody style={{ marginLeft: "100px" }}>
  {employeelist.map((item: EmployeeInterface) => (
    <TableRow key={item.ID} >
      <TableCell align="center">{item.PersonalID}</TableCell>
      <TableCell align="center">{item.Employeename}</TableCell>
      <TableCell align="center">{item.Position?.Name}</TableCell>
      <TableCell align="center">{item.Tusername}</TableCell>
      <TableCell align="center">{item.Email}</TableCell>
      <TableCell align="center">{item.Phonenumber}</TableCell>
      <TableCell align="center">{item.Salary}</TableCell>
      <TableCell align="center">{item.Gender}</TableCell>
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
        <Paper>
        <div style={{ height: 560, width: "100%",  margin: "10px auto", display: "flex", justifyContent: "center" }}>
          <DataGrid rows={employeelist} getRowId={(row) => row.ID} columns={columns} pageSize={5} rowsPerPageOptions={[5]} sx={customStyles} />
        </div>
        </Paper>
        <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" > 
                    {`คุณต้องการลบข้อมูลที่ ${employeelist.filter((employeelist) => (employeelist.ID === deleteID)).at(0)?.ID}?`}
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
  </Container>
 </div> 

 );

}


export default ManageShow;