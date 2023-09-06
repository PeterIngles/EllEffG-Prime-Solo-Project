import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { TextField, Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function CreateGroupPage() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const games = useSelector((store) => store.games);
    const players = useSelector((store) => store.players)
    const history = useHistory();

    const [selectGames, setSelectGames] = useState([]);
    const [selectPlayers, setSelectPlayers] = useState([]);

    const handleSelectionChange = (event, values) => {
        setSelectGames(values)
        setSelectPlayers(values);
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_GAMES' });
        dispatch({ type: 'FETCH_PLAYERS' })
        console.log("GAMES and PLAYERS", games, players)
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
                id="search to add player"
                disableClearable
                options={games.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search games"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <Autocomplete
                multiple
                value={selectPlayers}
                onChange={handleSelectionChange}
                id="search to add player"
                disableClearable
                options={players.map((option) => option.username)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search players"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <PersonAddIcon />
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <LogOutButton className="btn" />
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CreateGroupPage;
