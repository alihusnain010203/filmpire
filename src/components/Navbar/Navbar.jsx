import React, { useEffect, useState } from "react";
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
import Sidebar from '../Sidebar/Sidebar.jsx';

import { fetchToken ,createSessionId ,MovieApi } from "../../utils/index.js";

import { useDispatch,useSelector} from "react-redux";
import { setUser,selectUser } from "../../features/auth.js";
import Search from "../Search/Search.jsx";
const Navbar = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const {isAuth,user}=useSelector(selectUser)
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
const token=localStorage.getItem('requestToken');
  const session_idFromLocalStorage=localStorage.getItem('session_id');
  useEffect(() => {
    const loginUser=async()=>{
        if(token){
            if(session_idFromLocalStorage){
              const {data:Userdata}=await MovieApi.get(`/account?session_id=${session_idFromLocalStorage}`)
              dispatch(setUser(Userdata))
        }else{
          const sessionId=await createSessionId();
          const {data:Userdata}=await MovieApi.get(`/account?session_id=${sessionId}`)
          dispatch(setUser(Userdata))
        }
        }
    }
    loginUser() 
  },[token])
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
            {!isAuth ? (
              <Button color="inherit" onClick={() => {fetchToken()}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
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
