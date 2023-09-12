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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import ScheduleDayModal from './ScheduleDayModal';
import Avatar from '@mui/material/Avatar';
import MuiAlert from '@mui/material/Alert';
import EditTimeModal from './EditTimeModal'
import GroupReadyAlert from './GroupReadyAlert';

function GameSchedule(date) {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(54,54,58)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const group = useSelector((store) => store.group);
  const games = useSelector((store) => store.games)
  const responses = useSelector((store) => store.responses)
  const activity = useSelector((store => store.activity))

  const history = useHistory();

  let { groupId, gameId } = useParams();

  const dates = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"]

  // console.log("GroupId is", groupId, "gameId is", gameId, "Response are", responses, "Activites are", activity)

  const game = games.find((game) => game.id == gameId);

  useEffect(() => {
    // console.log("Games=", games)
    dispatch({ type: 'FETCH_USER_GAMES', payload: groupId });
    dispatch({ type: 'FETCH_GROUP_RESPONSES', payload: { groupId: groupId, gameId: gameId } });
    dispatch({ type: 'FETCH_ACTIVITY' })
  }, []);

  const backToGroup = () => {
    history.push(`/group/${groupId}`)
  }

  const toGameSchedule = (gameId) => {
    // console.log("clicked on")
    history.push(`/gameschedule/${groupId}/${gameId}`)
}

  return (
    <div id="user-sidebar" className="container">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="user routes">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={backToGroup}>
                <ListItemIcon >
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary={group.find(group => group.id == groupId)?.group_name || 'Not found'} />

              </ListItemButton>
            </ListItem>
          {games.map((game) => (
          <ListItem disablePadding>
            <ListItemButton key={game.id} onClick={() => toGameSchedule(game.id)}>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><div><h2>{game.title}</h2>
                <img src={game.icon} alt={game.title} style={{ width: '5%', height: 'auto' }} />
                <p>Reset Time: {game.reset}</p></div></TableCell>
              {activity.map((activity) => (
                <TableCell key={activity.id} align="right">{activity.activity_name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Tuesday <GroupReadyAlert/></TableCell>
              <ScheduleDayModal id={dates[0]}/>
              {responses.map((response) => {
                if (response.Date === "Tuesday") {
                  return (
                    <React.Fragment key={response.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{response.username}</TableCell>
                      <TableCell align="right">{response.time_start} </TableCell>
                      <TableCell align="right">{response.time_end}</TableCell><EditTimeModal prop={ {id: response.user_id, date: dates[0]} } />
                    </React.Fragment>
                  );
                }
                return null; // Return null when the condition is not met
              })}
            </TableRow>

            <TableRow >
              <TableCell>Wednesday</TableCell>
              <ScheduleDayModal id={dates[1]}/>
              {responses.map((response) => {
                if (response.Date === "Wednesday") {
                  return (
                    <React.Fragment key={response.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{response.username}</TableCell>
                      <TableCell align="right">{response.time_start}</TableCell>
                      <TableCell align="right">{response.time_end}</TableCell><EditTimeModal prop={ {id: response.user_id, date: dates[1]} }/>
                    </React.Fragment>
                  );
                }
                return null; // Return null when the condition is not met
              })}
            </TableRow>
            <TableRow >
              <TableCell>Thursday</TableCell>
              <ScheduleDayModal id={dates[2]}/>
              {responses.map((response) => {
                if (response.Date === "Thursday") {
                  return (
                    <React.Fragment key={response.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{response.username}</TableCell>
                      <TableCell align="right">{response.time_start} </TableCell>
                      <TableCell align="right">{response.time_end}</TableCell><EditTimeModal prop={ {id: response.user_id, date: dates[2]} }/>
                    </React.Fragment>
                  );
                }
                return null; // Return null when the condition is not met
              })}
            </TableRow>
            <TableRow >
              <TableCell>Friday</TableCell>
              <ScheduleDayModal id={dates[3]}/>
              {responses.map((response) => {
                if (response.Date === "Friday") {
                  return (
                    <React.Fragment key={response.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{response.username}</TableCell>
                      <TableCell align="right">{response.time_start} </TableCell>
                      <TableCell align="right">{response.time_end}</TableCell><EditTimeModal prop={ {id: response.user_id, date: dates[3]} }/>
                    </React.Fragment>
                  );
                }
                return null; // Return null when the condition is not met
              })}
            </TableRow>
            <TableRow >
              <TableCell>Saturday</TableCell>
              <ScheduleDayModal id={dates[4]}/>
              {responses.map((response) => {
                if (response.Date === "Saturday") {
                  return (
                    <React.Fragment key={response.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{response.username}</TableCell>
                      <TableCell align="right">{response.time_start} </TableCell>
                      <TableCell align="right">{response.time_end}</TableCell><EditTimeModal prop={ {id: response.user_id, date: dates[4]} }/>
                    </React.Fragment>
                  );
                }
                return null; // Return null when the condition is not met
              })}
            </TableRow>
            <TableRow >
              <TableCell>Sunday</TableCell>
              <ScheduleDayModal id={dates[5]}/>
              {responses.map((response) => {
                if (response.Date === "Sunday") {
                  return (
                    <React.Fragment key={response.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{response.username}</TableCell>
                      <TableCell align="right">{response.time_start} </TableCell>
                      <TableCell align="right">{response.time_end}</TableCell><EditTimeModal prop={ {id: response.user_id, date: dates[5]} }/>
                    </React.Fragment>
                  );
                }
                return null; // Return null when the condition is not met
              })}
            </TableRow>
            <TableRow >
              <TableCell>Monday</TableCell>
              <ScheduleDayModal id={dates[6]}/>
              {responses.map((response) => {
                if (response.Date === "Monday") {
                  return (
                    <React.Fragment key={response.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{response.username}</TableCell>
                      <TableCell align="right">{response.time_start} </TableCell>
                      <TableCell align="right">{response.time_end}</TableCell><EditTimeModal prop={ {id: response.user_id, date: dates[6]} }/>
                    </React.Fragment>
                  );
                }
                return null; // Return null when the condition is not met
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>

  );
}

// this allows us to use <App /> in index.js
export default GameSchedule;
