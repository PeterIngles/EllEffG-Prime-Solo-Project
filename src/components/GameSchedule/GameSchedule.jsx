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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function UserPage() {

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

  console.log("GroupId is", groupId, "gameId is", gameId, "Response are", responses, "Activites are", activity)

  const response = responses.find((item) => item.Date === 'Monday');
  console.log(response);

  const userId = user.id
  const game = games.find((game) => game.id == gameId);
  const gameTitle = game ? game.title : 'Not found';
  const gameIcon = game ? game.icon : 'Not found';
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("Games=", games)
    dispatch({ type: 'FETCH_USER_GAMES', payload: groupId });
    dispatch({ type: 'FETCH_GROUP_RESPONSES', payload: { groupId: groupId, gameId: gameId } });
    dispatch({ type: 'FETCH_ACTIVITY'})
  }, []);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  }

  const backToGroup = () => {
    history.push(`/group/${groupId}`)
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
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Group Schedule" />
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
  <TableCell>Tuesday</TableCell>
  <TableCell>
  <Button onClick={handleOpen}>sign Up</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="tuesdaySignUp"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="tuesdaySignUp" variant="h6" component="h2">
      Sign up for Tuesday?
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Basic time picker" />
      </DemoContainer>
    </LocalizationProvider>
    </Typography>
  </Box>
</Modal>
  </TableCell>
  {responses.map((response) => {
    if (response.Date === "Tuesday") {
      return (
        <React.Fragment key={response.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{response.username}</TableCell>
          <TableCell align="right">{response.time_start}</TableCell>
          <TableCell align="right">{response.time_end}</TableCell>
        </React.Fragment>
      );
    }
    return null; // Return null when the condition is not met
  })}
</TableRow>

            <TableRow >
              <TableCell>Wednesday</TableCell>
              {responses.map((response) => {
    if (response.Date === "Wednesday") {
      return (
        <React.Fragment key={response.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{response.username}</TableCell>
          <TableCell align="right">{response.time_start}</TableCell>
          <TableCell align="right">{response.time_end}</TableCell>
        </React.Fragment>
      );
    }
    return null; // Return null when the condition is not met
  })}
            </TableRow>
            <TableRow >
              <TableCell>Thursday</TableCell>
              {responses.map((response) => {
    if (response.Date === "Thursday") {
      return (
        <React.Fragment key={response.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{response.username}</TableCell>
          <TableCell align="right">{response.time_start}</TableCell>
          <TableCell align="right">{response.time_end}</TableCell>
        </React.Fragment>
      );
    }
    return null; // Return null when the condition is not met
  })}
            </TableRow>
            <TableRow >
              <TableCell>Friday</TableCell>
              {responses.map((response) => {
    if (response.Date === "Friday") {
      return (
        <React.Fragment key={response.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{response.username}</TableCell>
          <TableCell align="right">{response.time_start}</TableCell>
          <TableCell align="right">{response.time_end}</TableCell>
        </React.Fragment>
      );
    }
    return null; // Return null when the condition is not met
  })}
            </TableRow>
            <TableRow >
              <TableCell>Saturday</TableCell>
              {responses.map((response) => {
    if (response.Date === "Saturday") {
      return (
        <React.Fragment key={response.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{response.username}</TableCell>
          <TableCell align="right">{response.time_start}</TableCell>
          <TableCell align="right">{response.time_end}</TableCell>
        </React.Fragment>
      );
    }
    return null; // Return null when the condition is not met
  })}
            </TableRow>
            <TableRow >
              <TableCell>Sunday</TableCell>
              {responses.map((response) => {
    if (response.Date === "Sunday") {
      return (
        <React.Fragment key={response.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{response.username}</TableCell>
          <TableCell align="right">{response.time_start}</TableCell>
          <TableCell align="right">{response.time_end}</TableCell>
        </React.Fragment>
      );
    }
    return null; // Return null when the condition is not met
  })}
            </TableRow>
            <TableRow >
              <TableCell>Monday</TableCell>
              {responses.map((response) => {
    if (response.Date === "Monday") {
      return (
        <React.Fragment key={response.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{response.username}</TableCell>
          <TableCell align="right">{response.time_start}</TableCell>
          <TableCell align="right">{response.time_end}</TableCell>
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
export default UserPage;
