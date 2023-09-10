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

function UserPage() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const group = useSelector((store) => store.group);
  const games = useSelector((store) => store.games)
  const history = useHistory();

console.log("The group is", group)
console.log("The game is", games)

let { groupId, gameId } = useParams();

console.log("GroupId is", groupId, "gameId is", gameId)

const userId= user.id
const game = games.find((game) => game.id == gameId);
const gameTitle = game ? game.title : 'Not found';
const gameIcon = game ? game.icon : 'Not found';


useEffect(() => {
    console.log("Games=", games)
    dispatch({ type: 'FETCH_USER_GAMES', payload: groupId });
}, []);

function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Signed Up
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell>Times</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                      <TableRow>
                        <TableCell component="th" scope="row">
                          HC MekkaDragon
                        </TableCell>
                        <TableCell>HC 8PM-10PM</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  
  const rows = [
    createData('Tuesday', 159, 6.0, 24, 4.0, 3.99),
    createData('Wednesday', 237, 9.0, 37, 4.3, 4.99),
    createData('Thursday', 262, 16.0, 24, 6.0, 3.79),
    createData('Friday', 305, 3.7, 67, 4.3, 2.5),
    createData('Saturday', 356, 16.0, 49, 3.9, 1.5),
    createData('Sunday', 356, 16.0, 49, 3.9, 1.5),
    createData('Monday', 356, 16.0, 49, 3.9, 1.5),
  ];

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


  <div><h2>{game.title}</h2>
        <img src={game.icon} alt={game.title} style={{ width: '5%', height: 'auto' }}/>
        <p>Reset Time: {game.reset}</p></div>

        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Day</TableCell>
            <TableCell align="right">Activty 1</TableCell>
            <TableCell align="right">Activity 2</TableCell>
            <TableCell align="right">Activity 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
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
