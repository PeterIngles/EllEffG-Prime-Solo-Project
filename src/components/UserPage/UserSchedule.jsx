import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import MuiAlert from '@mui/material/Alert';
import GroupsIcon from '@mui/icons-material/Groups';
import ScheduleDayModal from '../GameSchedule/ScheduleDayModal';
import EditTimeModal from '../GameSchedule/EditTimeModal';
import GroupReadyAlert from '../GameSchedule/GroupReadyAlert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserSchedule({ filteredResponses }) {

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
  const user = useSelector((store) => store.user);
  const group = useSelector((store) => store.group);
  const games = useSelector((store) => store.games)
  const responses = useSelector((store) => store.responses)
  const activity = useSelector((store => store.activity))
  const userResponses = useSelector((store => store.userResponses))

  const history = useHistory();

  let { groupId, gameId } = useParams();

  const dates = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"]

  // console.log("UserId", user.id, "GroupId is", groupId, "gameId is", gameId, "Response are", responses, "Activites are", activity)

  console.log("userResponses", userResponses)


  const game = games.find((game) => game.id == gameId);

  useEffect(() => {
    // console.log("Games=", games)
    dispatch({ type: 'FETCH_USER_ACTIVITY', payload: user.id })
  }, []);

  const backToGroup = () => {
    history.push(`/group/${groupId}`)
  }

  const toGameSchedule = (gameId) => {
    // console.log("clicked on")
    history.push(`/gameschedule/${groupId}/${gameId}`)
  }

  let rows = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"]

  const toGroupMembers = () => {
    history.push(`/group/${groupId}`)
  }
  console.log("RESPONSES", responses)




  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Group Name</TableCell>
            <TableCell align="right">Game Title</TableCell>
            <TableCell align="right">Time Start</TableCell>
            <TableCell align="right">Time End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredResponses.map((response, index) => (
            <TableRow key={index}>
              <TableCell>{response.Date}</TableCell>
              <TableCell align="right">{response.group_name}</TableCell>
              <TableCell align="right">{response.game_title}</TableCell>
              <TableCell align="right">{response.time_start}</TableCell>
              <TableCell align="right">{response.time_end}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );




}

// this allows us to use <App /> in index.js
export default UserSchedule
