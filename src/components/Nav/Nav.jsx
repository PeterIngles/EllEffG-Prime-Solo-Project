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

function Nav() {
  const user = useSelector((store) => store.user);

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

              <Link className="navLink" to="/about">
                About
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </>
  );
}

export default Nav;
