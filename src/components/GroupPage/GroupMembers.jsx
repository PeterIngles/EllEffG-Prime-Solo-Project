import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function GroupMembers() {


    

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
                    {/* <List>
            {players.map((player) => (
              if(player.)
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
           ))}
          </List> */}
                </nav>
            </Box>
        </div>

    );
}

export default GroupMembers;