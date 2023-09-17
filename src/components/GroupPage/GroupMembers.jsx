import React, { useEffect, useState } from 'react';
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
import { AddPlayers } from './AddPlayer';
import DeletePlayerModal from './DeletePlayerModal';

function GroupMembers() {

let { id } = useParams();
id = Number(id)

const dispatch = useDispatch();
const user = useSelector((store) => store.user);
const players = useSelector((store) => store.players)

const [selectedPlayers, setSelectedPlayers] = useState([]);

const handlePlayersChange = (selectedPlayers) => {
    setSelectedPlayers(selectedPlayers);
};

console.log("SelectedPlayers", selectedPlayers)

const postPlayers = () => {
    console.log("Clicked on ADDTOGROUP")
    dispatch({
        type: 'ADD_PLAYERS', payload: {
            selectedPlayers: selectedPlayers,
            groupId: id
        }
    }
    )
    
}

console.log("Players", players)


    return (
        <div style={{
            display: 'flex',
            flexFlow: 'column wrap',
            justifyContent: 'flex-start',
            alignItems: 'baseline',
            flexDirection: 'row'
        }}>
            <ListItem>
                        <ListItemButton>
                            <ListItemText>
                            <Typography variant="h4">
            PLAYER LIST
        </Typography> 
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
            

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'stretch', width: '100%', maxWidth: 360, bgcolor: 'background.paper'
            }}>
                <nav aria-label="player-list">
                <List>
                <AddPlayers onPlayersChange={handlePlayersChange} sx={{
                alignItems: 'stretch'
            }}
            ></AddPlayers>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText>

                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
      {players.map((player, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemText primary={player.username} />
          </ListItemButton>
          {player.user_id === user.id ? (
            <DeletePlayerModal/>
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