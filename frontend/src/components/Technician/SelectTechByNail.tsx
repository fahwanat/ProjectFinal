import React, { useState, useEffect, useCallback} from "react";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { EmployeeInterface } from "../../models/IManage";
import { ServiceInterface, ServiceTypeInterface, TimeServiceInterface } from "../../models/IService";
import Logo2 from "../../Image/LOGO2.png"
import { styled } from '@mui/material/styles';
import { FormControl, Select, SelectChangeEvent } from "@mui/material";
import { GetEmployeelist } from "./service/TechnicianHttpClientService";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { pink , common} from "@mui/material/colors";
import { BiSearchAlt } from "react-icons/bi";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
    maxHeight: '80%',
  });
  const bgnavbar = createTheme({
    palette: {
      primary: {
        // Purple and grey play nicely together.
        main: pink[200],
      },
      secondary: {
        // Purple and grey play nicely together.
        main: common['black'],
      },
  
    },
  });
function SelectTechByHair() {
    const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
    const [service_type, setServiceType] = useState<ServiceTypeInterface[]>([]);
    const [selectedFilter, setSelectedFilter] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [filter, setFilter] = useState(employee);
    const [Employeename, setEmployeename] = useState("");
    let navigate = useNavigate();

    const apiUrl = "http://localhost:8080";
    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const fetchAllEmployees = async () => {
        fetch(`${apiUrl}/employees`, requestOptionsGet)
          .then((response) => response.json())
          .then((result) => {
            console.log("emps",result.data);
            setEmployee(result.data);
          });
      };

    

    useEffect(() => {
        // GetEmployee();
        // getServicetype();
        fetchAllEmployees();

    }, []);

    useEffect(() => {
        const NewFilter = employee.filter((employee) => {
          // กรองเฉพาะ ID ที่ 1, 2, และ 3 เท่านั้น
          return [6,7,8].includes(employee.ID);
        });
    
        setFilter(NewFilter);
      }, [employee]);
    
    return (    
        <div>
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    backgroundSize: "contain",
                    backgroundImage:"url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
                }}>
              
            <Container maxWidth="md" sx={{marginBottom: 5}}>
            {filter.map((row, idx) => (
                <Paper
                    sx={{
                    p: 2,
                    margin: 'auto',
                    marginTop: 4,
                    maxWidth: 600,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 130, height: 120 }}>
                            <div>
                                <img src={Logo2} width= "130px" height="130px"/>
                            </div>
                        </ButtonBase>
                    </Grid>
                <Grid item xs={15} md container>
                <Grid item xs>
                            <Typography variant="body1" gutterBottom marginTop={1} marginBottom={-0.5}>
                                ช่าง:
                            </Typography>
                            <ListItem >
                                <ListItemText primary={`${row.Employeename}`} />
                            </ListItem>

                            <Typography variant="body1" gutterBottom marginTop={2} marginBottom={-0.5}>
                                ให้บริการ:
                            </Typography>
                            <ListItem >
                                <ListItemText primary={`${row.Position.Name}`} />
                            </ListItem>                                                    
                        </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    <Box>
                        <Button 
                            onClick={() =>
                                navigate(`/Book/Appointment/${row.ID}`)
                            }
                            variant="outlined" 
                            size="small" 
                            color="primary">
                            จองคิว                           
                        </Button>
                    </Box>
                    </Typography>
                </Grid>
                </Grid>
            </Grid>
        </Paper>
      ))}
        <Stack direction="row" sx={{marginTop: 2, marginRight: 15 , marginLeft: 15}} >
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/SelectService"
            sx={{ marginRight: 15}}>
              กลับ
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            component={RouterLink} 
            to="/BookingCreateNoTech"
            sx={{ marginLeft: 34}}>
              ไม่ต้องการเลือกช่าง
          </Button> 
        </Stack>
        </Container>
    </Container>
    </div>
  );
}
export default SelectTechByHair
