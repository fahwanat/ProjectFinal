import * as React from "react";
import Carousel from "react-material-ui-carousel";
import im3 from "../Image/im3.jpg"
import im5 from "../Image/im5.jpg"
import im6 from "../Image/im6.jpg"
import Logo5 from "../Image/LOGO5.png"
import employee1 from "../Image/employee1.jpg"
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import { pink, common } from "@mui/material/colors";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AppBar, Box, Button, Grid, IconButton, ThemeProvider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from '@mui/icons-material/YouTube';

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


function About() {
  const themep = useTheme();
  const [open, setOpen] = React.useState(false);

  //เรียกใช้งานรูปภาพเป็นสไลด์ๆ
  function Item(props: any) {
    return (
         <img src={props.item.Image} width= "100%" height="600px"/>
      );
  }

  var Slider = [
    {
      Image: im3,
    },
    {
      Image: im5,
    },
    {
      Image: im6,
    },
  ];
//เรียกใช้ Carousel
  function ImageC() {
    return (
      <Carousel>
        {Slider.map((item, i) => (<Item key={i} item={item} />))}
      </Carousel>
    );
  }

  return (
    <ThemeProvider theme={bgnavbar}>
        <AppBar position="fixed">
          <Toolbar>
            <div>
              <img src={Logo5} width= "75px" height="75px"/>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%'}}>
              <Typography variant="h6" color="secondary" noWrap component="div" marginLeft={2}>
                <div className="word-header-navbar">
                  <h1>Bueaty Salon</h1>
                </div>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '30%'}}>
              <Button component={RouterLink} to="/Homeshow"  color="secondary" sx={{ display: 'flex', width: '10%'}} >Home</Button>
              <Button component={RouterLink} to="/RW"  color="secondary" sx={{ display: 'flex', width: '10%'}}>รีวิว</Button>
              <Button component={RouterLink} to="/About"  color="secondary" sx={{ display: 'flex', width: '25%'}}>ข้อมูลต่างๆ</Button>
  
            </Box>
            <Box sx={{ display: 'flex', width: '3%'}}>
              <IconButton component={RouterLink} to="/member/create" sx={{ display: 'flex', width: '10%'}} color="secondary" >
                <PersonAddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', width: '6.5%'}}>
            <Button component={RouterLink} to="/home" variant="contained" color="secondary" >LOGIN</Button>
            </Box>
            <Box sx={{ display: 'flex', width: '10%'}}>
            <Button component={RouterLink} to="/home" variant="contained" color="secondary" >จองคิว</Button>
            </Box>
            
          </Toolbar>
  
        </AppBar>
        <div>
       <Grid>
        {ImageC()}
       </Grid >
  
       <div className="grid-con2-1">
          <div className="grid-item-21-2">
            <div className="grid-item-info3">
              <div className="word-header-about">
                <h1>Information for Bueaty Salon</h1>
              </div>
            </div>
          </div>
          <div className="grid-item-21-1">
            <div className="grid-item-21-1-1">
              <div>
                <img src={employee1} width= "65px" height="55px"/>
              </div>
            </div>
            <div className="grid-item-21-1-2">
              <div>
                <img src={employee1} width= "65px" height="55px"/>
              </div>
            </div>
            <div className="grid-item-21-1-3">
              <div>
                <img src={employee1} width= "65px" height="55px"/>
              </div>
            </div>
            <div className="grid-item-21-1-4">
              <div>
                <img src={employee1} width= "65px" height="55px"/>
              </div>
            </div>
          </div>

          </div>
          <div className="grid-item-22-1">
            <div className="grid-item-info3">
            {/* &nbsp; การเว้นวรรค */}
              {/* <h2>ช่างทำผม<br/><br/><br/></h2> */}
              {/* <p> ช่างทำผม <br/>
                ประสบการณ์ 10 ปี 
                iugwetugwuitWEGweg
                eoJWITJWITEKGNSIEO
                gojeiohnirhndrthe
              </p> */}
            </div>
          </div>
          

        </div>
        
  </ThemeProvider>
    );
  }

export default About;