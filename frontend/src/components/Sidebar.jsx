import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Logo from '../assets/logo.svg';
import '../styles/Sidebar.css';

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleSignOutConfirm = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Logo Section */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
          <img src={Logo} alt="Logo" style={{ height: 40 }} />
        </Toolbar>

        <Divider />

        {/* Combined Menu Items */}
        <List sx={{ flexGrow: 1 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/Dashboard">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Main Panel" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/notifications">
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           
          </ListItem>
        </List>

        {/* Single Divider with Sign Out */}
        <Divider />
        <List>
          <ListItem disablePadding>
        
<ListItemButton 
  onClick={handleOpenDialog}
  sx={{
    color: 'red',
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.08)',
      animation: 'pulseRed 1.5s ease infinite'
    }
  }}
>
  <ListItemIcon sx={{ color: 'inherit' }}>
    <LogoutIcon />
  </ListItemIcon>
  <ListItemText 
    primary="Sign Out" 
    primaryTypographyProps={{ 
      sx: { 
        color: 'red', // Explicit red color
        fontWeight: 'medium',
        animation: 'textPulse 2s ease-in-out infinite'
      } 
    }} 
  />
</ListItemButton>
          </ListItem>
        </List>

        {/* Confirmation Dialog */}
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 2,
              backgroundColor: '#fefefe',
              boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
              minWidth: 400,
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            Confirm Sign Out
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: '1rem', color: '#555' }}>
              You are about to sign out. Are you sure you want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseDialog} variant="contained" color="error">Cancel</Button>
            <Button onClick={handleSignOutConfirm} variant="contained" color="error">Sign Out</Button>
          </DialogActions>
        </Dialog>
      </Drawer>
    </Box>
  );
}