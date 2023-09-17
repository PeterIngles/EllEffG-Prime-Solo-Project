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
import MuiAlert from '@mui/material/Alert';
import GroupsIcon from '@mui/icons-material/Groups';
import ScheduleDayModal from './ScheduleDayModal';
import EditTimeModal from './EditTimeModal';
import GroupReadyAlert from './GroupReadyAlert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';

function GameSchedule() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const group = useSelector((store) => store.group);
  const games = useSelector((store) => store.games);
  const responses = useSelector((store) => store.responses);
  const activity = useSelector((store) => store.activity);

  const history = useHistory();
  let { groupId, gameId } = useParams();
  const dates = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  const game = games.find((game) => game.id == gameId);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_GAMES', payload: groupId });
    dispatch({ type: 'FETCH_GROUP_RESPONSES', payload: { groupId: groupId, gameId: gameId } });
    dispatch({ type: 'FETCH_ACTIVITY' });
  }, []);

  const backToGroup = () => {
    history.push(`/group/${groupId}`);
  };

  const toGameSchedule = (gameId) => {
    history.push(`/gameschedule/${groupId}/${gameId}`);
  };


  const filteredResponses = {
    Tuesday: responses.filter((response) => response.Date === "Tuesday"),
    Wednesday: responses.filter((response) => response.Date === "Wednesday"),
    Thursday: responses.filter((response) => response.Date === "Thursday"),
    Friday: responses.filter((response) => response.Date === "Friday"),
    Saturday: responses.filter((response) => response.Date === "Saturday"),
    Sunday: responses.filter((response) => response.Date === "Sunday"),
    Monday: responses.filter((response) => response.Date === "Monday"),
  };

  return (
    <div id="user-sidebar" className="container" style={{ padding: '0', overflow: 'auto', maxHeight: '100vh' }}>
      <Box disablePadding sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="user routes">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={backToGroup}>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary={group.find((group) => group.id == groupId)?.group_name || 'Not found'} />
                <ArrowBackIcon />
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
          </List>
        </nav>
      </Box>
      <div id="user-groups">
      </div>
  <TableContainer component={Paper} style={{ maxWidth: "80%" }}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell align="center">Date</TableCell>
        <TableCell align="center">Username</TableCell>
        <TableCell align="center">Time Start</TableCell>
        <TableCell align="center">Time End</TableCell>
        <TableCell align="center">Group Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {dates.flatMap((day, index) => {
        const responses = filteredResponses[day];
        if (!responses || responses.length === 0) {
          return (
            <TableRow key={index}>
              <TableCell align="center">{day}</TableCell>
              <TableCell align="center">
                <ScheduleDayModal align="center" id={{ date: day }} />
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <GroupReadyAlert id={{ date: day }} />
              </TableCell>
            </TableRow>
          );
        }

        return [
          <TableRow key={`${index}-header`}>
            <TableCell align="center">{day}</TableCell>
              <TableCell align="center">
                <ScheduleDayModal align="center" id={{ date: day }} />
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <GroupReadyAlert id={{ date: day }} />
              </TableCell>
          </TableRow>,
          ...responses.map((response, responseIndex) => (
            <TableRow key={`${index}-${responseIndex}`}>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{response.username}</TableCell>
              <TableCell align="center">{response.time_start}</TableCell>
              <TableCell align="center">{response.time_end}</TableCell>
              <TableCell align="center">
                <EditTimeModal prop={{ id: response.user_id, date: day }} />
              </TableCell>
            </TableRow>
          )),
        ];
      })}
    </TableBody>
  </Table>
</TableContainer>



    </div>
  );
}

export default GameSchedule;
