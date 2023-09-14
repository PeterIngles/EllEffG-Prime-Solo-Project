import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

function GroupMembers() {

const user = useSelector((store) => store.user);
const players = useSelector((store) => store.players)

console.log("Players", players)


    return (
        <div style={{
            display: 'flex',
            flexFlow: 'column wrap',
            justifyContent: 'flex-start',
            alignItems: 'baseline',
            flexDirection: 'row'
        }}>
            <Typography>
            PLAYER LIST
        </Typography> 
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'stretch', width: '100%', maxWidth: 360, bgcolor: 'background.paper'
            }}>
                <nav aria-label="player-list">
                <List>
      {players.map((player, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemText primary={player.username} />
          </ListItemButton>
          {player.user_id === user.id ? (
            <Button>LEAVE GROUP</Button>
          ) : null}
        </ListItem>
      ))}
    </List>
                </nav>
            </Box>
        </div>

    );
}

export default GroupMembers;