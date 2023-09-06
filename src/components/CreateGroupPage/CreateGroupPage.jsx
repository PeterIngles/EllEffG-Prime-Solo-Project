import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { TextField, Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';

function CreateGroupPage() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const games = useSelector((store) => store.games);
    const history = useHistory();

    const [selectGames, setSelectGames] = useState([]);
      
    const handleSelectionChange = (event, values) => {
          setSelectGames(values);
        };

      useEffect(() => {
        dispatch({ type: 'FETCH_GAMES'});
        console.log("GAMES", games)
    }, []);

    return (
        <div>
            <h1>CREATE GROUP PAGE</h1>
            <ul></ul>
            <TextField
          required
          id="filled-required"
          label="Group Name"
          placeholder="Group Name"
          variant="filled"
        />
        <Autocomplete
  multiple
  value={selectGames}
  onChange={handleSelectionChange}
  options={games.map((game) => game.title)} // Map over the games array and extract the title property
  renderInput={(params) => (
    <TextField
      {...params}
      variant="standard"
      label="Games"
      placeholder=""
    />
  )}
/>
        
        
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <LogOutButton className="btn" />
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CreateGroupPage;
