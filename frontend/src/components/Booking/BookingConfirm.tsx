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
import { BookingsInterface } from "../../models/modelBooking/IBooking";
import { ServiceInterface, ServiceTypeInterface, TimeServiceInterface } from "../../models/IService";
import Logo2 from "../../Image/LOGO2.png"
import { styled } from '@mui/material/styles';
import { FormControl, Select, SelectChangeEvent } from "@mui/material";


import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { pink , common} from "@mui/material/colors";
import { BiSearchAlt } from "react-icons/bi";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { GetBookingsBYUID, GetMemberByUID } from "./services/BookingHttpClientService";
import { MemberInterface } from "../../models/modelMember/IMember";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
    maxHeight: '80%',
  });
  const bgnavbar = createTheme({
    palette: {
      primary: {
        main: pink[200],
      },
      secondary: {
        main: common['black'],
      },
  
    },
  });
  const FullScreenContainer = styled('div')({
    height: '80vw',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
  });

function SelectTechByHair() {
  const [bookings, setBookings] = useState<BookingsInterface[]>([]);
  const [members, setMembers] = useState<MemberInterface>();

  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [serviceid, setServicesid] = useState('');
  
  const [filter, setFilter] = useState(bookings);
  let navigate = useNavigate();
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
    useEffect(() => {
        const NewFilter = bookings.filter((bookings) => {
          return([]);
        });
    
        setFilter(NewFilter);
      }, [bookings]);
    
    return (
    <FullScreenContainer>
      <Container maxWidth="md" sx={{ marginTop: 2, justifyContent: "center" }}>
        <Box flexGrow={1} sx={{ marginTop: 1 }} textAlign={"center"}>
          <Typography component="h2" variant="h6" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
            ข้อมูลการจองคิวของคุณ {members?.FirstName}
          </Typography>
        </Box>
        <Stack direction="row" sx={{ marginTop: 2 ,marginBottom: 2, marginRight: 0, marginLeft: 0 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/SelectService"
            sx={{ marginRight: 0 }}
          >
            กลับ
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
                  margin: 'auto',
                  maxWidth: 300,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md container>
                    <Grid item xs>  
                      <ListItem>
                        <ListItemText primary={`บริการที่จอง: ${row.ServiceType?.Name}`} />
                      </ListItem>
  
                      <ListItem>
                        <ListItemText primary={`ช่างที่จอง: ${row.Employee?.Employeename}`} />
                      </ListItem>

                      <ListItem>
                        <ListItemText primary={`วันที่จอง : ${row.BookingDate}`} />
                      </ListItem>

                      <ListItem>
                        <ListItemText primary={`เวลาที่จอง: ${row.TimeService?.Start_End}`} />
                      </ListItem>

                      <ListItem>
                        <ListItemText primary={`ราคา: ${row.Total}`} />
                      </ListItem>
                    </Grid>
                  </Grid>
                  
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* <Stack direction="row" sx={{ marginTop: 2, marginRight: -15, marginLeft: 15 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/SelectService"
            sx={{ marginRight: 15 }}
          >
            กลับ
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/Payment/Create"
            sx={{ marginLeft: 45 }}
          >
            ชำระค่ามัดจำ
          </Button>
        </Stack> */}
      </Container>
    </FullScreenContainer>
  );
}
export default SelectTechByHair
