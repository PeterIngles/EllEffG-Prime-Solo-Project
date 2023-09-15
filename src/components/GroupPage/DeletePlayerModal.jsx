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

function DeletePlayerModal() {

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
  const activity = useSelector((store) => store.activity) 

  const history = useHistory();

  let groupId = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

let id = user.id
console.log("GroupID", groupId.id)

  const deletePlayer = () => {
    console.log("Inside deletePlayer")
    dispatch({
      type: 'DELETE_PLAYER', payload: {
        userId: id,
        groupId: groupId.id,
      }
    })
    handleClose()
    history.push('/user')
  }

  return (
    <div>
      <TableCell>
        <Button onClick={handleOpen} variant="outlined" color="error">LEAVE GROUP</Button>
        <Modal
          open={open}
          onClose={handleClose} // Fixed the misplaced closing parenthesis
          aria-labelledby="SignUp"
          aria-describedby="SignUp"
        >
          <Box sx={style}>
            <Typography id="SignUp" variant="h6" component="h2">
              CONFIRM LEAVING GROUP
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Button onClick={handleClose} variant="outline" color="error">CANCEL<CancelIcon /></Button>
                <Button onClick={deletePlayer} variant="outlined" color="error">CONFIRM<PersonRemoveIcon /></Button>
              </LocalizationProvider>
            </Typography>
          </Box>
        </Modal>
      </TableCell>
    </div>
  );
}

export default DeletePlayerModal;
