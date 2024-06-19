import * as React from "react";
import Carousel from "react-material-ui-carousel";

import n2 from "../../Image/HNF/n2.jpg"
import c2 from "../../Image/HNF/c2.jpg"
import c3 from "../../Image/HNF/c3.jpg"
import c4 from "../../Image/HNF/c4.jpg"
import hair4 from "../../Image/hair4.jpg"
import f1 from "../../Image/HNF/f1.jpg"
import c5 from "../../Image/HNF/c5.jpg"
import face3 from "../../Image/face3.jpg"
import n1 from "../../Image/HNF/n1.jpg"
import Logo5 from "../../Image/LOGO5.png"
import w1 from "../Image/w1.jpg"
import w3 from "../Image/w3.jpg"
import p2 from "../Image/p2.png"

import LOGO2 from "../../Image/LOGO2.png"
import Logo from "../../Image/LOGO.png"
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


function Review() {
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
        <meta charSet="utf-8"></meta>
<meta name="viewport" content="width=device-width, intial-scale=1.0"></meta>
<link rel="stylesheet" href="css/style.css"/>
<link rel="shortcut icon" href="images/fav-icon.png"/>
<link rel="preconnect" href="https://fonts.gstatic.com"></link>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
<script src="https://kit.fontawesome.com/c8e4d183c2.js" crossOrigin="anonymous"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
       {/* <Grid>
        {ImageC()}
       </Grid >
   */}
       {/* <div classNameName="grid-con2-1">
          <div classNameName="grid-item-21-2">
            <div classNameName="grid-item-info3">
              <div classNameName="word-header-about">
                <h1>รีวิวจากลูกค้า</h1>
              </div>
            </div>
          </div>
          <div classNameName="grid-item-21-1">
            <div classNameName="grid-item-21-1-1">
              <div>
              <div classNameName="container">
                <img src={hair1} width= "65px" height="55px"/>
                <div classNameName="overlay">
                <div classNameName="text">
            <h2>Short Bob </h2>
              <h5>ทรงผมบ๊อบสั้น สไลด์ปลายนิดๆ</h5>
                <span classNameName="fa fa-star checked"></span>
                <span classNameName="fa fa-star checked"></span>
                <span classNameName="fa fa-star checked"></span>
                <span classNameName="fa fa-star"></span>
                <span classNameName="fa fa-star"></span>
            </div>
              </div>
              </div>
              </div>
            </div>
            <div classNameName="grid-item-21-1-2">
              <div>
              <div classNameName="container">
                <img src={hair2} width= "65px" height="55px"/>              
              <div classNameName="overlay">
            <div classNameName="text">
              <h2>Layered Haircut </h2>
              <h5>ทรงผมไล่ระดับเป็นชั้น ๆ ทำให้ผมดูมีวอลลุ่ม</h5>
              </div>
            </div>
            </div>
              </div>
            </div>
            <div classNameName="grid-item-21-1-3">
              <div>
              <div classNameName="container">
                <img src={hair3} width= "65px" height="55px"/>
                <div classNameName="overlay">
            <div classNameName="text">
              <h2>Wolf Haircut </h2>
             <h5> ทรงผมสไลด์ไล่ระดับผมเป็นชั้น ๆ รับกับช่วงคอ ให้ความรู้สึกคล้ายกับแผงคอของหมาป่า </h5>
              </div>
            </div>
              </div>
              </div>
            </div>
            <div classNameName="grid-item-21-1-4">
              <div>
              <div classNameName="container">
                <img src={hair4} width= "65px" height="55px"/>
                <div classNameName="overlay">
            <div classNameName="text">
             <h2> Hush Haircut </h2>
              <h5>ทรงผมสไลด์ปลายบางที่มีความคล้ายกับทรงผมรากไทร แต่ผมช่วงบนก็จะไม่สไลด์สั้นจนตั้ง</h5>
              </div>
            </div>
            </div>
              </div>
            </div>
          </div>
      </div> */}
      
            <section id="testimonials">
        <div className="testimonial-heading">
            <h1></h1>
        </div>
        <div className="testimonial-box-container">
            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                
                <div className="client-comment">
                    <p>ทรงผมยอดฮิต สไลด์ปลายบาง เปลี่ยนลุคสาวเท่ๆ</p>
                    <center><img src={hair4} width= "200px" height="250px" /></center>
                </div>
            </div>
            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="client-comment">
                <p>ย้อมสีผม เปลี่ยนสไตล์ น่ามองมากขึ้น</p>
                <center><img src={c5} width= "280px" height="250px" /></center>
                </div>
            </div>
            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="client-comment">
                <p>ตกแต่งเล็บได้หลากหลาย เพิ่มลวดลายสีสันใหม่ๆ </p>
                <center><img src={n2} width= "200px" height="250px" /></center>
                </div>
            </div>
            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                
                <div className="client-comment">
                <p>ซอยผมหรือตัดผม เปลี่ยนลุคใหม่ๆ</p>
                <center><img src={c4} width= "220px" height="250px" /></center>
                </div>
            </div>

            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2}/>
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                
                <div className="client-comment">
                <p>ยืดตรง เรียบง่าย เหมาะกับทุกลุค</p>
                <center><img src={c3} width= "280px" height="250px" /></center>
                </div>
            </div>

            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                
                <div className="client-comment">
                <p>ดัดผม เปลี่ยนลุคใหม่ เพิ่มเสน่ห์ให้กับตัวคุณ</p>
                <center><img src={c2} width= "280px" height="250px" /></center>
                </div>
            </div>    
            
            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                
                <div className="client-comment">
                <p>สปาหน้า ผลัดเซลล์ผิว เพิ่มความชุ่มชื้น</p>
                <center><img src={f1} width= "290px" height="250px" /></center>
                </div>
            </div>

                        <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon</strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                
                <div className="client-comment">
                <p>เล็บเจลสดใสๆ น่ารักๆ</p>
                <center><img src={n1} width= "250px" height="250px" /></center>
                </div>
            </div>

                        <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={LOGO2} />
                        </div>
                        <div className="name-user">
                            <strong>BeautySalon </strong>
                            <span>@beauty salon</span>
                        </div>
                    </div>
                    <div className="reviews">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    </div>
                </div>
                
                <div className="client-comment">
                <p>นวดหน้า ผ่อนคลาย พักผ่อนเพลินๆ</p>
                <center><img src={face3} width= "290px" height="250px" /></center>
                </div>
            </div> 
        </div>
        
    </section>

    <div className="grid-confooter">
        <div className="grid-item-footer">
          <h3>ที่ตั้งร้าน : 123 ถนนสุขุมวิท, กรุงเทพฯ</h3>
        </div>
        <div className="grid-item-footer2">
          <h3>เบอร์ติดต่อ : 080-329-9545</h3>
        </div>
        <div className="grid-item-footer3">
          <h3>เปิดบริการวันจันทร์-ศุกร์ และ วันอาทิตย์</h3>
        </div>
        <div className="grid-item-footer4">
          <h2>ติดต่อเรา</h2>
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

export default Review;