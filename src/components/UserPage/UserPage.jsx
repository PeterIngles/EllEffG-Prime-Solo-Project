import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import UserSchedule from './UserSchedule';
import "./UserPage.css"


function UserPage() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const group = useSelector((store) => store.group);
  const history = useHistory();

  const userResponses = useSelector((store => store.userResponses))
  const tueFilteredResponses = userResponses.filter(response => response.Date === "Tuesday");
  const wedFilteredResponses = userResponses.filter(response => response.Date === "Wednesday");
  const thurFilteredResponses = userResponses.filter(response => response.Date === "Thursday");
  const friFilteredResponses = userResponses.filter(response => response.Date === "Friday");
  const satFilteredResponses = userResponses.filter(response => response.Date === "Saturday");
  const sunFilteredResponses = userResponses.filter(response => response.Date === "Sunday");
  const monFilteredResponses = userResponses.filter(response => response.Date === "Monday");

  const [view, setView] = useState('groups');

  const images = {
    url: '/images/GroupsBackground.jpeg',
    title: 'Group Background',
    width: '40%',
  };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

  const showGroups = () => {
    dispatch({ type: 'FETCH_GROUPS', payload: user.id });
    console.log("store.group", group)
    setView('groups');
  }

  const createGroup = () => {
    history.push('/creategroup')
  }

  const toGroupId = (id) => {
    console.log("group.id=", id)
    history.push(`/group/${id}`)
  }

  const toUserSchedule = () => {
    dispatch({type: 'FETCH_USER_ACTIVITY_RESPONSES', payload: user.id})
    setView('userSchedule');
  }

  return (
    <div>
      <div id="user-sidebar" className="container" style={{ display: 'flex', padding: '0' }}>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
          <nav aria-label="user routes">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={showGroups}>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Groups" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={toUserSchedule}>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Schedule" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="create options">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={createGroup}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Group" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </div>
      <div id="user-groups">
        <Button></Button>
        {view === 'groups' ? (
          <React.Fragment>
            {group.map((group, index) => (
              <div key={index}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                  <ImageButton
                    onClick={() => toGroupId(group.id)}
                    focusRipple
                    key={images.title}
                    style={{
                      width: images.width,
                    }}
                  >
                    <ImageSrc style={{ backgroundImage: `url(${images.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                          position: 'relative',
                          p: 4,
                          pt: 2,
                          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                      >
                        {group.group_name}
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </Image>
                  </ImageButton>
                </Box>
              </div>
            ))}
          </React.Fragment>
        ) : (
          <UserSchedule filteredResponsesTue={tueFilteredResponses} 
                    filteredResponsesWed={wedFilteredResponses}
                    filteredResponsesThur={thurFilteredResponses}
                    filteredResponsesFri={friFilteredResponses}
                    filteredResponsesSat={satFilteredResponses}
                    filteredResponsesSun={sunFilteredResponses}
                    filteredResponsesMon={monFilteredResponses} />
        )}
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
