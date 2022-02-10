import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import FooterComponent from './Footer'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';
import './AppLayout.scss';


export default function AppLayout() {
    const [auth, setAuth] = React.useState(true);
    const [sidebarOn, setsidebarOn] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSideBar = (event) => {
        setsidebarOn(!sidebarOn);
    }
    let SideBar;
    if(sidebarOn)
    {
        SideBar = <Sidebar />;
    }



    return (
      <Box sx={{ flexGrow: 1 }}>
          
          
        {SideBar}
        <AppBar position="static" style={{ background: '' }} >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleSideBar}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography component="div" sx={{ flexGrow: 1 }}>
                <div className="sidebar_logo"><h3>SupplyChain</h3></div>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        
      <Outlet />
      <FooterComponent/>
      </Box>
      
    );
  }





// const AppLayout = () => {
//     return <div style={{
//         padding: '50px 0px 0px 370px'
//     }}>
       
//         <Sidebar />
//         <Outlet />
//     </div>;
// };

// export default AppLayout;