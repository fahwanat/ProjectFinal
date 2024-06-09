import * as React from "react";
import Carousel from "react-material-ui-carousel";
import Logo5 from "../../Image/LOGO5.png"
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import { pink , common} from "@mui/material/colors";
import { AppBar, Box, Button, Container, Grid, IconButton, ThemeProvider } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { grey } from "@mui/material/colors";

const bgbutton = createTheme({
    palette: {
      primary: {
        main: grey[800],
      },
      secondary: {
        main: grey[50],
      },
  
    },
  });  

function SelectService() {
  const themep = useTheme();
  const [open, setOpen] = React.useState(false);

  //เรียกใช้งานรูปภาพเป็นสไลด์ๆ
  function Item(props: any) {
    return (
         <img src={props.item.Image} width= "100%" height="600px"/>
      );
  }


  return (
    <ThemeProvider theme={bgbutton}>
        <Container 
            maxWidth="xl"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "91.35vh",
                overflow: "hidden",
                backgroundSize: "cover",
                backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
                
              }}
        >
        <div>
        <div className="grid-con-homepage-1">
        <div className="grid-item-22-3">
          <div className="word-homepage">
            <h1>เลือกบริการที่ท่านต้องการใช้บริการ</h1>
          </div>
        </div>
        </div> 

        <div className="grid-con-selectserveic">
        {/* <div className="grid-item-buttom-home">
          <button className="button-booking" type="button" disabled> 
            <RouterLink className = "" rel="stylesheet" to="/Book" > Booking </RouterLink>
          </button> 
        </div> */}
        <div className="grid-item-buttom-hair">
          <button className="button-hair" type="button" disabled> 
            <RouterLink className = "" rel="stylesheet" to="/SelectTechByHair" > ทำผม </RouterLink>
          </button> 
        </div>
        <div className="grid-item-buttom-nail">
          <button className="button-nail" type="button" disabled> 
            <RouterLink className = "" rel="stylesheet" to="/SelectTechByNail" > ทำเล็บ </RouterLink>
          </button> 
        </div>
        <div className="grid-item-buttom-face">
          <button className="button-face" type="button" disabled> 
            <RouterLink className = "" rel="stylesheet" to="/SelectTechByFace" > สปาหน้า </RouterLink>
          </button> 
        </div>
        </div>   
        </div>

        </Container>

        
        {/* <div className="bgimghome">
          <div>
            
          </div>
          </div> */}
        
    </ThemeProvider>
  );
}

export default SelectService;