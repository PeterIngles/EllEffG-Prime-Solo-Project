import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import Diversity3Icon from '@mui/icons-material/Diversity3';

function GroupReadyAlert(prop) {

  console.log("Prop", prop.id.date)

  let { groupId, gameId } = useParams();

  let test = false

  console.log("groupId", groupId, "gameId", gameId, "prop", prop)

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const responses = useSelector((store) => store.responses);
  const activity = useSelector((store) => store.activity);
  const group = useSelector((store) => store.group);

  let groupResponses = responses.filter((response) => response.group_id == groupId && response.Date == prop.id.date).length
  
 console.log("❌❌", groupResponses)


  const renderContent = () => {
    if (groupResponses >= 6) {
      return (
        <Fab variant="extended" color="success">
          <Diversity3Icon sx={{ mr: 1 }} />
          Group Ready
        </Fab>
      );
    } else if (groupResponses >= 1 && groupResponses < 6) {
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
        Not Ready
        </Fab>)
    }
  };

  return renderContent();
}

export default GroupReadyAlert;
