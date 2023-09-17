import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function SearchPlayers({ onPlayersChange }) {
    const [selectPlayers, setSelectPlayers] = useState([]);
    const players = useSelector((store) => store.players);

    const handleSelectionChange = (event, values) => {
        setSelectPlayers(values);
        onPlayersChange(values);
    };
    const filteredOptions = players.filter((option) => {
        // Filter out the selected players
        return !selectPlayers.some((selected) => selected.value === option.id);
    });

    return (
        <Autocomplete
        multiple
        value={selectPlayers}
        onChange={handleSelectionChange}
        id="search-to-add-player"
        disableClearable
        options={filteredOptions.map((option) => ({ value: option.id, label: option.username }))}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Search players"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    style: { color: 'white' },
                }}
                sx={{
                    '.MuiButtonBase-root-MuiChip-root': { backgroundColor: 'white' },
                    '.MuiFormLabel-root': { color: '#ffffff' },
                    '.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                }}
            />
        )}
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip
                    label={option.label}
                    {...getTagProps({ index })}
                    sx={{ backgroundColor: 'rgb(64,60,61)', color: 'white' }}
                />
            ))
        }
    />
    );
}
