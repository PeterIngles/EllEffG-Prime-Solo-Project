import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function AddPlayers({ onPlayersChange }) {

    const [selectPlayers, setSelectPlayers] = useState([]);
    const players = useSelector((store) => store.players)
    const allPlayers = useSelector ((store) => store.allPlayers)
    const dispatch = useDispatch();

    const handleSelectionChange = (event, values) => {
        setSelectPlayers(values);
        onPlayersChange(values);
    };

    console.log("AssPlayers", allPlayers)

    useEffect(() => {
      dispatch({ type: 'FETCH_ALL_PLAYERS' })
  }, []);


    return <Autocomplete
        multiple
        value={selectPlayers}
        onChange={handleSelectionChange}
        id="search to add player"
        disableClearable
        options={allPlayers.map((option) => ({ value: option.id, label: option.username }))}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Search players"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    style: { color: 'white' }
                }}
                sx={{
                    '.MuiButtonBase-root-MuiChip-root': {backgroundColor: 'white'},
                    '.MuiFormLabel-root': { color: '#ffffff' },
                    '.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white'
                      }
                }} />
        )} />;
}
