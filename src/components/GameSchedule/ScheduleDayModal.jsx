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
import CancelIcon from '@mui/icons-material/Cancel';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


function ScheduleDayModal(props) {

  const date = props.id;

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

  //   console.log("GroupId is", groupId, "gameId is", gameId, "Response are", responses, "Activites are", activity)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedStartTime, setSelectedStartTime] = useState({});
  const [selectedEndTime, setSelectedEndTime] = useState({});

  let responseCheck = responses.find(response =>
    response.Date == date && response.user_id === user.id
  );

  let startHour = selectedStartTime.$H;
  let startMinute = String(selectedStartTime.$m).padStart(2, '0');
  let startAMPM = startHour >= 12 ? "PM" : "AM";
  if (startHour >= 13) {
    startHour = startHour - 12;
  }
  let formattedStartTime = `${startHour}:${startMinute} ${startAMPM}`;


  let endHour = selectedEndTime.$H
  let endMinute = String(selectedEndTime.$m).padStart(2, '0');
  let endAMPM = endHour >= 12 ? "PM" : "AM";
  if (endHour >= 13) {
    endHour = endHour - 12;
  }
  let formattedEndTime = `${endHour}:${endMinute} ${endAMPM}`;

  const postResponse = () => {
    dispatch({
      type: 'ADD_RESPONSE', payload: {
        userId: user.id,
        groupId: groupId,
        activity_id: activity,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        date: date
      }
    }
    )
    handleClose()
  }

  const deleteResponse = () => {
    console.log("Inside deleteResponse")
    dispatch({
      type: 'DELETE_RESPONSE', payload: {
        date: date,
        userId: user.id,
        groupId: groupId,
        activity_id: activity,

      }
    })

  }

  const renderContent = () => {
    if (responseCheck) {
      return (
        ///Renders if signed up
        <div>
          <TableCell>
            <Button onClick={handleOpen} variant="contained">REMOVE SIGN UP</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="SignUp"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="SignUp" variant="h6" component="h2">
                  Remove from activity?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Button onClick={handleClose} variant="outline" color="error">CANCEL<CancelIcon /></Button>
                    <Button onClick={deleteResponse} variant="outlined" color="error">CONFIRM<PersonRemoveIcon /></Button>
                  </LocalizationProvider>
                </Typography>
              </Box>
            </Modal>
          </TableCell>
        </div>
      );
    } else {
      //Renders if you are not signed up
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
                </Typography>wd
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Start time picker"
                      value={selectedStartTime}
                      onChange={setSelectedStartTime} />
                    <TimePicker label="End time picker"
                      value={selectedEndTime}
                      onChange={setSelectedEndTime} />
                    <Button onClick={postResponse} variant="contained">SIGN UP<EventAvailableIcon /></Button>
                  </LocalizationProvider>
                </Typography>
              </Box>
            </Modal>
          </TableCell>
        </div>
      );
    }

  }
  return renderContent();
}

// this allows us to use <App /> in index.js
export default ScheduleDayModal;
