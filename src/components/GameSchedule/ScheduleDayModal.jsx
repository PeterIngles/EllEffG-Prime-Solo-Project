import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function ScheduleDayModal(prop) {

  let date = prop.id.date;
  console.log("DATE", date)

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

  console.log("RESPONSECHECK", responseCheck)

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
        gameId: gameId,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        date: date
      }
    }
    )  
    handleClose();
  }

  const deleteResponse = () => {
    // console.log("Inside deleteResponse")
    dispatch({
      type: 'DELETE_RESPONSE', payload: {
        date: date,
        userId: user.id,
        groupId: groupId,
        gameId: gameId,

      }
    })
    handleClose();
  }

  const renderContent = () => {
    if (responseCheck) {
      return (

        ///Renders if signed up
       
        <TableCell align="center">
            <Button onClick={handleOpen} variant="outlined" color="error">REMOVE SIGN UP</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="SignUp"
              aria-describedby="SignUp"
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
      
      );
    } else {
      //Renders if you are not signed up
      return (
       
          <TableCell align="center">
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
       
      );
    }

  }

  return renderContent();
}

// this allows us to use <App /> in index.js
export default ScheduleDayModal;
