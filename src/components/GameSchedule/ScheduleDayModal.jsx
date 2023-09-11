import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';


function ScheduleDayModal(props) {

    const date  = props.id;

    console.log("DAAAATE",props)

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  console.log("Time", selectedStartTime)
//   const hour = selectedStartTime.$d.getHours();
//   let hour12 = hour % 12;
//    if (hour12 === 0) {
//      hour12 = 12;
//    }
//    const minute = date.getMinutes();
//    const ampm = hour < 12 ? 'AM' : 'PM';

//    console.log(hour12 + ':' + minute + ' ' + ampm);

  const postResponse = () => {
    console.log("clicked on postResponse")
    dispatch({
        type: 'ADD_RESPONSE', payload: {
            userId: user.id,
            groupId: groupId,
            activity_id: activity,
            start_time: selectedStartTime,
            end_time: selectedEndTime,
            date: date
        }
    }
    )
    handleClose
}

  return (
    <div>
      <TableCell>
      <Button onClick={handleOpen} variant="contained">Sign Up</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="SignUp"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="SignUp" variant="h6" component="h2">
              Sign up for {date}?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="Start time picker" 
                value={selectedStartTime}
                onChange={setSelectedStartTime}/>
                <TimePicker label="End time picker" 
                value={selectedEndTime}
                onChange={setSelectedEndTime}/>
                <Button onClick={postResponse} variant="contained">SIGN UP<EventAvailableIcon/></Button>
              </LocalizationProvider>
            </Typography>
          </Box>
        </Modal>
      </TableCell>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ScheduleDayModal;
