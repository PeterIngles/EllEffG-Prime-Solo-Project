import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TableCell from '@mui/material/TableCell';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function EditTimeModal(props) {

  const { id, date } = props.prop;

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
  const responses = useSelector((store) => store.responses);
  const activity = useSelector((store) => store.activity);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedStartTime, setSelectedStartTime] = useState({});
  const [selectedEndTime, setSelectedEndTime] = useState({});

  console.log("Response", responses, "userid", user)






  // const editTimeResponse = () => {
  //   console.log('Inside editTimeResponse');
  //   // Dispatch your edit action here
  //   dispatch({
  //     type: 'EDIT_RESPONSE', // Change this to your actual edit action type
  //     payload: {
  //       date: date,
  //       userId: user.id,
  //       groupId: groupId,
  //       activity_id: activity,
  //       startTime: selectedStartTime,
  //       endTime: selectedEndTime,
  //     },
  //   });
  //   handleClose();
  // };

  const renderContent = () => {
    if (id === user.id) {
      return (
        <div>
          <TableCell>
            <Button
              onClick={handleOpen}
              variant="outlined"
              color="warning"
            >
              EDIT TIME
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="EditTime"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="EditTime" variant="h6" component="h2">
                  Edit availability time on {date}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Start time picker"
                      value={selectedStartTime}
                      onChange={setSelectedStartTime}
                    />
                    <TimePicker
                      label="End time picker"
                      value={selectedEndTime}
                      onChange={setSelectedEndTime}
                    />
                    <Button
                      variant="contained"
                      // onClick={editTimeResponse}
                    >
                      Edit Time
                    </Button>
                  </LocalizationProvider>
                </Typography>
              </Box>
            </Modal>
          </TableCell>
        </div>
      );
    }
    else{
    return null; // Return null if there is no response
    }
  };

  return renderContent();
}

export default EditTimeModal;
