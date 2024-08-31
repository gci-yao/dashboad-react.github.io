import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';





export default function NavBar({like}) {
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
  const deconnexion = ()=>{
    localStorage.removeItem("utilisateur");
    window.location.replace("/connexion");
  }
  const profil = ()=>{
    window.location.replace("/profile");
  }


  return (
    <Box sx={{ flexGrow: 1,  }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{
                width:"29px",
                height:"29px",
                backgroundColor:"red",
                marginTop:"0px",
                marginLeft:"-20px",
                marginRight:"40px",
                borderRadius:"1rem"
              }}> <h5 style={{marginTop:"8px", marginLeft:"10px", fontSize:"0.8rem"}}> {like}</h5></div>
          <Typography color="info" variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <h5 style={{color:"yellow"}}>GciApp</h5>
          </Typography>
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
              
                <div style={{
                  width:"12px",
                  height:"12px",
                  backgroundColor:"greenyellow",
                  marginTop:"-20px",
                  marginLeft:"7px",
                  borderRadius:"1rem"
                }}> <h5 style={{marginTop:"-28px"}}></h5>
                 </div>   
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
                <MenuItem onClick={profil}>Profile</MenuItem>
                <MenuItem onClick={deconnexion}>Deconnexion</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
