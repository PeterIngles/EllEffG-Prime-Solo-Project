import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function SearchPlayers() {
    
    const [selectPlayers, setSelectPlayers] = useState([]);
    const players = useSelector((store) => store.players)

    const handleSelectionChange = (event, values) => {
        setSelectPlayers(values);
    };


    return <Autocomplete
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
                }} />
        )} />;
}
