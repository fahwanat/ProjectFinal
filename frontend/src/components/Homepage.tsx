import { Button, createTheme, FormLabel, Grid, ThemeProvider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";
// import im1 from "../Image/im1.jpg"
import { Link as RouterLink } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";



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
  
  function onClick() { 
    window.open("/Homeshow");
    } 

function Homepage() {

    return (
      
    <ThemeProvider theme={bgbutton}>
        <Container 
            maxWidth="xl"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                overflow: "hidden",
                backgroundSize: "cover",
                backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
              }}
        >
        <div>
        <div className="grid-con-homepage-1">
        <div className="grid-item-22-3">
          <div className="word-homepage" >
            <h1>ยินดีต้อนรับสู่ร้านเสริมสวย</h1>
            <h3>Welcome to Beauty Salon</h3>
          </div>
        </div>
        </div> 

        <div className="grid-con-homepage-2">
        {/* <div className="grid-item-buttom-home">
          <button className="button-booking" type="button" disabled> 
            <RouterLink className = "" rel="stylesheet" to="/Book" > Booking </RouterLink>
          </button> 
        </div> */}
        <div className="grid-item-buttom-register">
          <button className="button-home" type="button" disabled> 
            <RouterLink className = "" rel="stylesheet" to="/Homeshow" > หน้าแรก </RouterLink>
          </button> 
        </div>
        <div className="grid-item-buttom-login">
          <button className="button-login" type="button" disabled> 
            <RouterLink className = "" rel="stylesheet" to="/SignIn" > เข้าสู่ระบบ </RouterLink>
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
   
   export default  Homepage;