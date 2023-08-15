import * as React from "react";
import Carousel from "react-material-ui-carousel";
import im3 from "../Image/im3.jpg"
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
            <img src={Logo3} width= "75px" height="75px"/>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%'}}>
            <Typography variant="h6" color="secondary" noWrap component="div" marginLeft={2}>
              <div >
                บิวตี้ซาลอน
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

     <div className="grid-con2">
        <div className="grid-item-21">
          <img src="https://fangrio.com/wp-content/uploads/2018/02/S__12328981-1024x768.jpg" />
        </div>
        <div className="grid-item-22">
          <div className="grid-item-info3">
            <h1>ยินดีต้อนรับเข้าสู่ บิวตี้ซาลอน</h1>
          </div>
        </div>
        <div className="grid-item-23">
          <div className="grid-item-info4">
            <h4>บริการทุกระดับประทับใจ ลูกค้าต้องการแบบไหนบอกช่างได้เลย</h4>
            <h4>ร้านเปิดบริการวันจันทร์-ศุกร์ และอาทิตย์ ตั้งแต่เวลา 10:00 - 17:00 น.</h4>
            <h4>ร้านของเรามีบริการต่างๆ ดังนี้</h4>
            <h4>*****************************</h4>
            <h4>1. ทำผม --- สระผม/ไดร์ผม ตัดผม/ซอยผม ยืดผม ย้อมผม ดัดผม </h4>
            <h4>2. ทำเล็บ --- ทาสีเจล เพ้นต์เล็บ ต่อเล็บ</h4>
            <h4>3. สปาเล็บ --- นวดหน้า ขัดหน้า</h4>
            <h4>*****************************</h4>
          </div>
        </div>
        <div className="grid-item-24">
          <img src="https://www.hairworldplus.com/wp-content/uploads/2020/09/Salons_image.jpg" />
        </div>
        {/* <div className="grid-item-25">
          <img src="https://www.phitsanulokhotnews.com/wp-content/media/2020/05/IMG_9339.jpg" />
        </div> */}
      </div>

      <div className="grid-con">
        <div className="grid-item-1-2">
          <div>
            <img src="https://cdn.shopify.com/s/files/1/0130/7233/4948/files/dreamstimemaximum_180911411_compressed_2048x2048.jpg?v=1633492651" />
          </div>
          <div>
            <img src="https://img.kapook.com/u/soisuda/a3/500_20.jpg" />
          </div>
        </div>
        <div className="grid-item-2">
          <div className="grid-item-info">
            <div>
              <h2>ทำผม</h2>
              <p>สระผม/ไดร์ผม</p>
              <p>ตัดผม/ซอยผม</p>
              <p>ยืดผม ย้อมผม ดัดผม</p>
            </div>
          </div>
          <div>
            <img src="https://cdn.shopify.com/s/files/1/0130/7233/4948/files/dreamstimemaximum_129356808_compressed_2048x2048.jpg?v=1633491936"></img>
          </div>
        </div>

        <div className="grid-item-2-1">
          <div>
            <img src="https://cdn.zipeventapp.com/blog/2023/06/2023-06-12_06-28-35_image.png"></img>
          </div>
          <div>
            <img src="https://img.salehere.co.th/p/1200x0/2021/06/09/qvydnoeefujy.jpg"></img>
          </div>
        </div>

        <div className="grid-item-3">
          <div>
            <img src="https://static.wixstatic.com/media/3546ac_fb3075ee1ab049a7bbd4a6c1b14e45bc~mv2.jpg/v1/fill/w_601,h_601,al_c,lg_1,q_85,enc_auto/3546ac_fb3075ee1ab049a7bbd4a6c1b14e45bc~mv2.jpg"></img>
          </div>
          <div className="grid-item-info">
            <div>
              <h2>ทำเล็บ</h2>
              <p>ทาสีเจล เพ้นต์เล็บ ต่อเล็บ</p>
              <p>เพ้นต์เล็บ</p>
              <p>ต่อเล็บ</p>
            </div>
          </div>
        </div>
        <div className="grid-item-4">
          <div>
            <img src="https://www.tsj-group.com/wp-content/uploads/2019/03/tsj-group-thai-face-natural-spa-product.jpg"></img>
          </div>
          <div className="grid-item-info">
            <div>
              <h2>สปาหน้า</h2>
              <p>นวดหน้า</p>
              <p>ขัดหน้า</p>
            </div>
          </div>
        </div>
        <div className="grid-item-6">
          <div>
            <img src="https://s.isanook.com/wo/0/ud/14/73133/73133-20171002045545-85e1c34.jpg"></img>
          </div>
          <div>
            <img src="https://images.lifestyleasia.com/wp-content/uploads/sites/8/2022/08/18172106/e0b899e0b8a7e0b894e0b8abe0b899e0b989e0b8b2_b.jpeg?tr=w-1200,h-900"></img>
          </div>
        </div>
        
      </div>

      <div className="grid-confooter">
        <div className="grid-item-footer">
          <h2>เบอร์ติดต่อ</h2>
        </div>
        <div className="grid-item-footer2">
          <p>เปิดบริการวันจันทร์-ศุกร์ และอาทิตย์</p>
        </div>
        <div className="grid-item-footer3">
          <h3>0803299545</h3>
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