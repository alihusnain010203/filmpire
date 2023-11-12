import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import useStyles from "./NavbarStyle.js";
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar.jsx'
import Search from "../Search/Search.jsx";
const Navbar = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const isAuthenticated = true;
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => {setOpenMobile(!openMobile)}}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={() => {}} sx={{ ml: 1 }}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search/>}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={"/profile/:id"}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={``}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search/>}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
{isMobile?(
  <Drawer
  variant="temporary"
  anchor="right"
   open={openMobile}
   onClose={() => setOpenMobile((prevOpenMobile)=>{
!prevOpenMobile
   })}
   classes={{ paper: classes.drawerPaper }}
   ModalProps={{ keepMounted: true }}
  >
<Sidebar setOpenMobile={setOpenMobile}/>
  </Drawer>
):(
  <Drawer classes={{ paper: classes.drawerPaper }
  } variant="permanent" open={true}>
<Sidebar setOpenMobile={setOpenMobile}/>
  </Drawer>
)}
        </nav>
      </div>
    </>
  );
};
export default Navbar;
