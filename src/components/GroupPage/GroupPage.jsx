import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import GroupMembers from './GroupMembers';

function UserPage() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const group = useSelector((store) => store.group);
  const games = useSelector((store) => store.games)
  const players = useSelector((store) => store.players)
  const history = useHistory();

  const [showPlayers, setShowPlayers] = React.useState(false);

  

  let { id } = useParams();
  id = Number(id)

  useEffect(() => {
    console.log("Group ID is", id)
    console.log("Games=", games)
    dispatch({ type: 'FETCH_USER_GAMES', payload: id });
    dispatch({type: 'FETCH_PLAYERS', payload: id})
  }, [id]);

  const toGameSchedule = (groupId, gameId) => {
    console.log("clicked on", id)
    history.push(`/gameschedule/${groupId}/${gameId}`)
  }

  const getPlayerlist = (groupId) => {
    dispatch({type: 'FETCH_GROUP_PLAYERS', payload: groupId})
    setShowPlayers(true)
  }

  return (
    <div >
      <div id="user-sidebar" className="container"
      style={{
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        flexDirection: 'row'
      }}>
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

              {games.map((game) => (
                <ListItem disablePadding>
                  <ListItemButton key={game.id} onClick={() => toGameSchedule(id, game.id)}>
                    <ListItemIcon>
                      <Avatar alt={game.title} src={game.icon} />
                    </ListItemIcon>
                    <ListItemText>
                      {game.title}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
          <Divider />
          <nav aria-label="create options">
            <List>
              <ListItem disablePadding>
                <ListItemButton  onClick={() => getPlayerlist(id)}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Group Members" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
        {showPlayers ? <GroupMembers /> : null}
        </div>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
