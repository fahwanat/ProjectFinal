import * as React from "react";
import Carousel from "react-material-ui-carousel";
import im2 from "../Image/im2.jpg"
import im5 from "../Image/im5.jpg"
import im6 from "../Image/im6.jpg"
import Logo3 from "../Image/LOGO3.png"
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { AppBar, Box, Button, Grid, IconButton, ThemeProvider } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from '@mui/icons-material/YouTube';

const bgnavbar = createTheme({
  palette: {
    primary: {
      // Purple and grey play nicely together.
      main: grey[800],
    },
    secondary: {
      // Purple and grey play nicely together.
      main: grey[50],
    },

  },
});


function Homeshow() {
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
      Image: im2,
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
            <img src={Logo3} width= "75px" height="75px"/>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%'}}>
            <Typography variant="h6" color="secondary" noWrap component="div" marginLeft={2}>
              <div >
                บิวตี้ซาลอน
              </div>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '25%'}}>
            <Button component={RouterLink} to="/Homeshow"  color="secondary" sx={{ display: 'flex', width: '10%'}} >Home</Button>
            <Button component={RouterLink} to="/Roomhome"  color="secondary" sx={{ display: 'flex', width: '10%'}}>Room</Button>
            <Button component={RouterLink} to="/RW"  color="secondary" sx={{ display: 'flex', width: '10%'}}>Review</Button>
            <Button component={RouterLink} to="/About"  color="secondary" sx={{ display: 'flex', width: '10%'}}>ABOUT</Button>

          </Box>
          <Box sx={{ display: 'flex', width: '3%'}}>
            <IconButton component={RouterLink} to="/customer/create" sx={{ display: 'flex', width: '10%'}} color="secondary" >
              <PersonAddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', width: '6.5%'}}>
          <Button component={RouterLink} to="/home" variant="contained" color="secondary" >LOGIN</Button>
          </Box>
          <Box sx={{ display: 'flex', width: '10%'}}>
          <Button component={RouterLink} to="/home" variant="contained" color="secondary" >BOOK NOW</Button>
          </Box>
          
        </Toolbar>

      </AppBar>
      <div>
     <Grid>
      {ImageC()}
     </Grid >
    
     
     <div className="grid-con2">
        <div className="grid-item-21">
          <img src="https://allstuffsalon.com/Files/product_picture_photo/875913207403836484.png" />
        </div>
        <div className="grid-item-22">
          <div className="grid-item-info3">
            <h1>ยินดีต้อนรับเข้าสู้ บิวตี้ซาลอน</h1>
          </div>
        </div>
        <div className="grid-item-23">
          <div className="grid-item-info4">
            <h3>บิวตี้ซาลอน ยินดีให้บริการลูกค้าทุกๆ ท่าน </h3>
          </div>
        </div>
        <div className="grid-item-24">
          <img src="https://media-cdn.tripadvisor.com/media/photo-s/1c/ff/66/8a/modern-thai-cuisine-perfectly.jpg" />
        </div>
        <div className="grid-item-25">
          <img src="https://media-cdn.tripadvisor.com/media/photo-s/0c/17/73/d1/legrande-lounge.jpg" />
        </div>
     </div>



     <div className="grid-con">
        <div className="grid-item-1">
          <img src="https://content.r9cdn.net/himg/80/b3/46/expediav2-13266-f26277-844954.jpg" />
        </div>
        <div className="grid-item-2">
          <div className="grid-item-info">
            <div>
              <h2>RELAX AND ENJOY</h2>
              <p>with the G03 Hotel.</p>
            </div>
          </div>
          <div>
            <img src="https://files.guidedanmark.org/files/382/242733_Hotel_Ottilia__Brchner_Hotels_PR.jpg"></img>
          </div>
        </div>
        <div className="grid-item-3">
          <div>
            <img src="https://www.nzbusinesstraveller.co.nz/wp-content/uploads/2022/08/Copy-of-Chairman-Suite-Lounge-1024x683.jpg"></img>
          </div>
          <div className="grid-item-info2">
            <div>
              <h2>EXCELLENT SERVICE</h2>
              <p>Service is available 24 hours a day.</p>
              <p>Always serve customers with a smile.</p>
            </div>
          </div>
        </div>
        <div className="grid-item-4">
          <div>
            <img src="https://assets.langhamhotels.com/is/image/langhamhotelsstage/cdakl-rooms-chairman-suite-bedroom-1680-945:Medium?wid=1680&hei=944"></img>
          </div>
          <div className="grid-item-info">
            <div>
              <h2>LUXURY BY THE SEA</h2>
              <p>Meet the beautiful sea view.</p>
            </div>
          </div>
        </div>
        <div className="grid-item-5">
          <div>
            <img src="https://www.thedenizen.co.nz/wp-content/uploads/2021/01/Opera-Suite-Lounge-1.jpg"></img>
          </div>
        </div>
    </div>

    <div className="grid-confooter">
        <div className="grid-item-footer">
          <h2>Phone Support</h2>
        </div>
        <div className="grid-item-footer2">
          <p>24 HOURS A DAY</p>
        </div>
        <div className="grid-item-footer3">
          <h3>+ 01 345 647 745</h3>
        </div>
        <div className="grid-item-footer4">
          <h2>Connect With Us</h2>
        </div>
        <div className="grid-item-footer5">
          <p>SOCIAL MEDIA CHANNELS</p>
        </div>
        <div className="grid-item-footer6">
          <IconButton color="secondary" href="https://www.facebook.com/profile.php?id=100088341936558" >
            <FacebookIcon />
          </IconButton>
          <IconButton color="secondary" href="https://www.youtube.com/watch?v=pugRd6WapdM" >
            <YouTubeIcon />
          </IconButton>
        </div>
      </div>
  </div>
</ThemeProvider>
  );
}

export default Homeshow;