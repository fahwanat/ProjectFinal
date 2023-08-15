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
                <Button 
                    component={RouterLink} to="/home" 
                    variant="contained"
                    color="primary"
                    size="large"
                    >
                    Employeee
                </Button>

                <Button 
                    component={RouterLink} to="/Homeshow" 
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ m: "1%"}}
                >
                    Member
                </Button>
        </Container>
    </ThemeProvider>
    );
   }
   
   export default  Homepage;