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

        <div className="grid-con2">
        <div className="grid-item-22-3">
          <div className="word-homepage">
            <h1>Welcom To Bueaty Salon</h1>
          </div>
        </div>
        
        <div className="grid-item-22-4">
          <button className="button-home" type="button" disabled>
            
            <RouterLink className = "" rel="stylesheet" to="/Homeshow" >หน้าแรก </RouterLink>
            {/* <a href="/Homeshow">หน้าแรก</a>  */}
            
        
          </button> 
          
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