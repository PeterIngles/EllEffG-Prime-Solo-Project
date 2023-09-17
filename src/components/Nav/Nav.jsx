import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

function Nav() {
  const user = useSelector((store) => store.user);

  const svgCode = `
 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 20 20" version="1.1">
    
    <title>swords [#101]</title>
    <desc>Created with Sketch.</desc>
    <defs>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7759.000000)" fill="white">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <polygon id="swords-[#101]" points="301.174002 7614.75989 303.9996 7617.58563 302.586801 7618.9995 299.761203 7616.17276 298.348404 7617.58563 296.934605 7616.17276 298.348404 7614.75989 294.0001 7609.98371 289.651796 7614.75989 291.064595 7616.17276 289.651796 7617.58563 288.238997 7616.17276 285.413398 7618.9995 283.9996 7617.58563 286.826197 7614.75989 285.413398 7613.34702 286.826197 7611.93415 288.238997 7613.34702 293.063895 7608.95554 283.9996 7598.9995 294.0001 7608.10322 303.9996 7598.9995 294.936304 7608.95554 299.761203 7613.34702 301.174002 7611.93415 302.586801 7613.34702"></polygon>
            </g>
        </g>
    </g>
</svg>

`;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // Toggle the menu open/close by setting anchorEl to null if it's already open, or to event.currentTarget if it's closed
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="nav">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: 'rgb(24,24,27)' }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {/* If no user is logged in, show these links */}
                  {!user.id && (
                    <MenuItem onClick={handleClose}>
                      <Link className="navLink" to="/login">
                        <Button color="inherit">Login / Register</Button>
                      </Link>
                    </MenuItem>
                  )}
                  {user.id && (
                    <div>
                      <MenuItem onClick={handleClose}>
                        <Link className="navLink" to="/user">Home</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link className="navLink" to="/info">Info Page</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <LogOutButton className="navLink" />
                      </MenuItem>
                    </div>
                  )}
                </Menu>
                <MenuIcon />
              </IconButton>
              <Link to="/home">
                <Typography variant="h6" component="div" className="nav-title" sx={{ flexGrow: 1 }}>
                  eLL-eFF-G
                </Typography>
              </Link>
              <SportsEsportsIcon/>
              <div>
      <div dangerouslySetInnerHTML={{ __html: svgCode }} />
    </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </>
  );
}

export default Nav;
