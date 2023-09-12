import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import Diversity3Icon from '@mui/icons-material/Diversity3';

function GroupReadyAlert() {

  let { groupId, gameId } = useParams();

  let test = false

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const responses = useSelector((store) => store.responses);
  const activity = useSelector((store) => store.activity);
  const group = useSelector((store) => store.group);

  const renderContent = () => {
    if (test == true) {
      return (
        <Fab variant="extended" color="success">
          <Diversity3Icon sx={{ mr: 1 }} />
          Group Ready
        </Fab>
      );
    } else if (test > 1 && test < 6) {
      return (
      <Fab variant="extended">
        <ThumbsUpDownIcon sx={{ mr: 1 }} />
        Partial Group
      </Fab>)
    }
    else {
      return (
        <Fab variant="extended" color="error">
          <ThumbDownAltIcon sx={{ mr: 1 }} />
        Group Not Ready
        </Fab>)
    }
  };

  return renderContent();
}

export default GroupReadyAlert;
