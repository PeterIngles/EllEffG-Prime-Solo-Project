import React, { useEffect} from 'react';
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

function UserSchedule(date) {

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

  const history = useHistory();

  let { groupId, gameId } = useParams();

  const dates = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"]

  console.log("UserId", user.id, "GroupId is", groupId, "gameId is", gameId, "Response are", responses, "Activites are", activity)

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
        <TableCell></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row}
          </TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
);
   
   

  
}

// this allows us to use <App /> in index.js
export default UserSchedule
