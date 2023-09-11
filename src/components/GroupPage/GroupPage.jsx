import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
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
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const group = useSelector((store) => store.group);
  const games = useSelector((store) => store.games)
  const history = useHistory();

console.log("The group is", group)
let { id } = useParams();
id = Number(id)

useEffect(() => {
    console.log("Group ID is", id)
    console.log("Games=", games)
    dispatch({ type: 'FETCH_USER_GAMES', payload: id });
}, [id]);

const toGameSchedule = (groupId, gameId) => {
    console.log("clicked on", id)
    history.push(`/gameschedule/${groupId}/${gameId}`)
}

  return (
    <div id="user-sidebar" className="container">
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="user routes">
        <List>
          <ListItem disablePadding>
          <ListItemButton>
              <ListItemIcon >
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary={group.find(group => group.id === id)?.group_name || 'Not found'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText>
                
                </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="create options">
        <List>
        <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Group Members" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    <div id="user-groups">
   
 
</div>
<div>
    {games.map((game) => (
      <div key={game.id} onClick={() => toGameSchedule(id, game.id)}>
        <h2>{game.title}</h2>
        <img src={game.icon} alt={game.title} style={{ width: '5%', height: 'auto' }}/>
        <p>Reset Time: {game.reset}</p>
      </div>
    ))}
  </div>

    
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
