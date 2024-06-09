import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import { grey,pink,common } from "@mui/material/colors";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HandymanIcon from "@mui/icons-material/Handyman";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReviewsIcon from "@mui/icons-material/Reviews";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PaymentIcon from "@mui/icons-material/Payment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
// import Logo1 from "../Image/LOGO.png"
import EventIcon from '@mui/icons-material/Event';
import Logo from "../Image/LOGO.png"

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

const drawerWidth = 320; //ความยาวของ แถบเมนู

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  // flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Navbar() {
  const themep = useTheme();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openpro = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  function MemberMenuBar() {
    if (localStorage.getItem("role") == "Member"){
    return(
    <MenuItem onClick={handleClose} component={RouterLink} to="/member/profile">ข้อมูลส่วนตัว</MenuItem>)}
  };

  const MemberMenu = [
    { name: "หน้าหลัก", icon: <HomeIcon />, path: "/Homeshow" },
    { name: "จองคิว", icon: <HomeIcon />, path: "/SelectService" },
    { name: "ข้อมูลการจองคิว", icon: <RoomServiceIcon />, path: "/BookConfirm" },
    { name: "รีวิว", icon: <ReviewsIcon />, path: "/AddReview" },
  ];
  const EmployeeMenu = [
    { name: "หน้าหลัก", icon: <HomeIcon />, path: "/home" },
    { name: "BookingMember", icon: <ReceiptLongIcon />, path: "/Book" },
    { name: "Payment", icon: <PaymentIcon />, path: "/CheckPay" },
  //   { name: "Check IN - Check Out", icon: <FactCheckIcon />, path: "/CNCO" },
  //   { name: "Check Payment", icon: <PriceCheckIcon />, path: "/CPM" },
  //   {
  //     name: "Check The Room",
  //     icon: <CheckroomIcon />,
  //     path: "/checkroom/list",
  //   },
  //   { name: "Room Information", icon: <BedroomParentIcon />, path: "/RT" },
  //   { name: "Room Warehouse", icon: <WarehouseIcon />, path: "/RoomW" },

    
  ];
  // const EmployeeMenu = [
  //   { name: "หน้าหลัก", icon: <HomeIcon />, path: "/home" },
  
  //   {
  //     name: "Member List",
  //     icon: <PeopleIcon />,
  //     path: "/member/showforadmin",
  //   },
  // ];
  const OfficerMenu = [
    {name: "จัดการข้อมูลพนักงาน", icon: <ManageAccountsIcon />,path: "/ManageShow",},
    {name: "ข้อมูลบริการ", icon: <ManageAccountsIcon />,path: "/Service"},
    // { name: "BookingMember", icon: <ReceiptLongIcon />, path: "/Book" },
    { name: "ข้อมูลชำระเงินค่ามัดจำ", icon: <PaymentIcon />, path: "/CheckPay" },
    { name: "ข้อมูลตรวจสอบการชำระเงิน", icon: <PriceCheckIcon />, path: "/CPM" },
    { name: "ข้อมูลการจองคิวของลูกค้า", icon: <PaymentIcon />, path: "/Payment/Show" },

  ];


  var menu: any[];
  switch (role) {
    case "Member":
      menu = MemberMenu;
      break;
    case "Technician":
      menu = EmployeeMenu;
      break;
    case "Officer":
      menu = OfficerMenu;
      break;
    default:
      menu = [];
      break;
  }

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setRole(localStorage.getItem("role") || "");
    }
  }, []);

  return (
    <ThemeProvider theme={bgnavbar}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <img src={Logo} width= "75px" height="75px"/>
          </div>
          <Box
            sx={{   display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",}}
          >
            <Typography variant="h6" color="secondary" noWrap component="div" marginLeft={2}>
            <div className="word-header-navbar">
                <h2>BEAUTY SALON</h2>
                </div>
            </Typography>
          </Box>
          {/* <Box sx={{ display: 'center', width: '6.5%', }}>
          <Button component={RouterLink} to="/SelectService" variant="contained" color='secondary' >
              จองคิว
          </Button>
          </Box> */}

          <Button
            // sx={{display: 'center', width: '10%',}}
            color="secondary"
            id="demo-positioned-button"
            aria-controls={openpro ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openpro ? "true" : undefined}
            onClick={handleClick}
            
          >
            <AccountCircleIcon/>
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openpro}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {MemberMenuBar()}
            <MenuItem onClick={SignOut}>
            <LogoutIcon style={{ marginRight: ".5rem" }} />
              ออกจากระบบ
            </MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* ปุ่มกด < */}
          <IconButton onClick={handleDrawerClose}>
            {themep.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>{" "}
          {/* ปุ่มกด < */}
        </DrawerHeader>

        <Divider />

        {menu.map((item, index) => (
          <ListItem
            key={index}
            button
            component={RouterLink}
            onClick={handleDrawerClose}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </ListItem>
        ))}

        <Divider />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </ThemeProvider>
  );
}

export default Navbar;
