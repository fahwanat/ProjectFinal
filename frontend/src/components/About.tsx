import * as React from "react";
import Carousel from "react-material-ui-carousel";

import im11 from "../Image/im11.jpg"
import im12 from "../Image/im12.jpg"
import h1 from "../Image/h1.jpg"

import nail0 from "../Image/nail0.jpg"
import face0 from "../Image/face0.jpg"
import hair0 from "../Image/hair0.jpg"
import hair1 from "../Image/hair1.jpg"
import hair2 from "../Image/hair2.jpg"
import hair3 from "../Image/hair3.jpg"
import hair4 from "../Image/hair4.jpg"
import Logo5 from "../Image/LOGO5.png"
import Logo from "../Image/LOGO.png"
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
  // function Item(props: any) {
  //   return (
  //        <img src={props.item.Image} width= "100%" height="750px"/>
  //     );
  // }

  // var Slider = [
  //   {
  //     Image: h1,
  //   },
  //   {
  //     Image: im11,
  //   },
  //   {
  //     Image: im12,
  //   },
  // ];
//เรียกใช้ Carousel
  // function ImageC() {
  //   return (
  //     <Carousel>
  //       {Slider.map((item, i) => (<Item key={i} item={item} />))}
  //     </Carousel>
  //   );
  // }

  return (
    <ThemeProvider theme={bgnavbar}>
        <AppBar position="fixed">
        <Toolbar>
          <div>
            <img src={Logo5} width= "75px" height="75px"/>
          </div>
          <Box sx={{  display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      width: '50%'}}>
            <Typography variant="h6" color='secondary' noWrap component="div" marginLeft={2} >
              <div className="word-header-navbar">
                <h1>Beauty Salon</h1>
              </div>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '30%'}}>
            <Button component={RouterLink} to="/Homeshow"  color='secondary' sx={{ display: 'flex', width: '20%'}} >หน้าแรก</Button>
            <Button component={RouterLink} to="/Review"  color='secondary' sx={{ display: 'flex', width: '10%'}}>แนะนำ</Button>
            <Button component={RouterLink} to="/About"  color='secondary' sx={{ display: 'flex', width: '25%'}}>เกี่ยวกับ</Button>

          </Box>
          {/* <Box sx={{ display: 'flex', width: '3%'}}>
            <IconButton component={RouterLink} to="/member/create" sx={{ display: 'flex', width: '10%'}} color='secondary' >
              <PersonAddIcon />
            </IconButton>
          </Box> */}
          <Box sx={{ display: 'flex', width: '8.5%'}}>
          <Button component={RouterLink} to="/member/create" variant="contained" color='secondary' >สมัครสมาชิก</Button>
          </Box>
          <Box sx={{ display: 'flex', width: '7.4%'}}>
          <Button component={RouterLink} to="/SignIn" variant="contained" color='secondary' >เข้าสู่ระบบ</Button>
          </Box>
          <Box sx={{ display: 'flex', width: '8.5%'}}>
          <Button component={RouterLink} to="/SignIn" variant="contained" color='secondary' >จองคิว</Button>
          </Box>

        </Toolbar>
  
        </AppBar>
        <div>
       {/* <Grid>
        {ImageC()}
       </Grid >
   */}
       <div className="grid-con2-1">
          <div className="grid-item-21-2">
            <div className="grid-item-info3">
              <div className="word-header-about">
                <h1>Services</h1>
              </div>
            </div>
          </div>
          <div className="grid-item-21-1">
            <div className="grid-item-21-1-1">
              <div>
              <div className="container">
                <img src={hair0} width= "65px" height="55px"/>
                <div className="overlay">
                <div className="text">
            <h2>ทำผม </h2>
              <h5>ลูกค้าสามารถเลือกบริการเกี่ยวกับการทำผมได้หลากหลาย ไม่ว่าจะเป็น
              สระผม/ไดร์ผมม,ตัดผม/ซอยผม,ยืดผม,ย้อมผม และดัดผม
              ซึ่งจะทำให้ลูกค้ามีความเพลิดเพลินและผ่อนคลาย
              </h5>
            </div>
              </div>
              </div>
              </div>
            </div>
            <div className="grid-item-21-1-2">
              <div>
              <div className="container">
                <img src={nail0} width= "65px" height="55px"/>              
              <div className="overlay">
            <div className="text">
              <h2>ทำเล็บ </h2>
              <h5>ลูกค้าสามารถเลือกบริการเกี่ยวกับการทำผมได้ตามความสนใจ ซึ่งจะมีบริการ
              ทาสีเจล,เพ้นต์เล็บ,ต่อเล็บ ลูกค้าสามารถเลือกลวดลายและสีได้อย่างสะดวก</h5>
              </div>
            </div>
            </div>
              </div>
            </div>
            <div className="grid-item-21-1-3">
              <div>
              <div className="container">
                <img src={face0} width= "65px" height="55px"/>
                <div className="overlay">
            <div className="text">
              <h2>สปาหน้า </h2>
             <h5>ลูกค้าสามารถเลือกบริการเกี่ยวกับสปาหน้าได้ ไม่ว่าจะเป็นการนวดหน้า สครับหน้า ทำความสะอาดหน้า
              บำรุงผิวหน้า เพื่อให้ลูกค้าได้รับความผ่อนคลาย และได้พักผ่อนหย่อนใจ
              
             </h5>
              </div>
            </div>
              </div>
              </div>
            </div>
            {/* <div className="grid-item-21-1-4">
              <div>
              <div className="container">
                <img src={hair4} width= "65px" height="55px"/>
                <div className="overlay">
            <div className="text">
             <h2> Hush Haircut </h2>
              <h5>ทรงผมสไลด์ปลายบางที่มีความคล้ายกับทรงผมรากไทร แต่ผมช่วงบนก็จะไม่สไลด์สั้นจนตั้ง</h5>
              </div>
            </div>
            </div>
              </div>
            </div> */}
          </div>

          <div className="grid-item-21-2-1">
            <div className="grid-item-info3">
              <div className="word-header-about">
                <h2>Popular hairstyles</h2>
              </div>
            </div>
          </div>
          <div className="grid-item-21-3">
            <div className="grid-item-21-1-1">
              <div>
              <div className="container">
                <img src={hair1} width= "65px" height="55px"/>
                <div className="overlay">
                <div className="text">
            <h2>Short Bob </h2>
              <h5>ทรงผมบ๊อบสั้น สไลด์ปลายนิดๆ</h5>
            </div>
              </div>
              </div>
              </div>
            </div>
            <div className="grid-item-21-1-2">
              <div>
              <div className="container">
                <img src={hair2} width= "65px" height="55px"/>              
              <div className="overlay">
            <div className="text">
              <h2>Layered Haircut </h2>
              <h5>ทรงผมไล่ระดับเป็นชั้น ๆ ทำให้ผมดูมีวอลลุ่ม</h5>
              </div>
            </div>
            </div>
              </div>
            </div>
            <div className="grid-item-21-1-3">
              <div>
              <div className="container">
                <img src={hair3} width= "65px" height="55px"/>
                <div className="overlay">
            <div className="text">
              <h2>Wolf Haircut </h2>
             <h5> ทรงผมสไลด์ไล่ระดับผมเป็นชั้น ๆ รับกับช่วงคอ ให้ความรู้สึกคล้ายกับแผงคอของหมาป่า </h5>
              </div>
            </div>
              </div>
              </div>
            </div>
            <div className="grid-item-21-1-4">
              <div>
              <div className="container">
                <img src={hair4} width= "65px" height="55px"/>
                <div className="overlay">
            <div className="text">
             <h2> Hush Haircut </h2>
              <h5>ทรงผมสไลด์ปลายบางที่มีความคล้ายกับทรงผมรากไทร แต่ผมช่วงบนก็จะไม่สไลด์สั้นจนตั้ง</h5>
              </div>
            </div>
            </div>
              </div>
            </div>
          </div>
          </div>
 
      </div>

      <div className="grid-confooter">
        <div className="grid-item-footer">
          <h2>เบอร์ติดต่อ</h2>
        </div>
        <div className="grid-item-footer2">
          <h3>080-329-9545</h3>
        </div>
        <div className="grid-item-footer3">
          <h3>เปิดบริการวันจันทร์-ศุกร์ และ วันอาทิตย์</h3>
        </div>
        <div className="grid-item-footer4">
          <h2>Connect With Us</h2>
        </div>
        <div className="grid-item-footer5">
          <p>Social Media Channels</p>
        </div>
        <div className="grid-item-footer6">
          <IconButton color='secondary' href="https://www.facebook.com/Fahwanatsanan/" >
            <FacebookIcon />
          </IconButton>
          <IconButton color='secondary' href="https://www.youtube.com/watch?v=jZGZ0OG6Zts&ab_channel=SweetTheKid" >
            <YouTubeIcon />
          </IconButton>
        </div> 
      </div>
           
  </ThemeProvider>
    );
  }

export default About;