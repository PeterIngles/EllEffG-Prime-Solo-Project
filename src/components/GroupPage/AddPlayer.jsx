import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useSelector, useDispatch } from 'react-redux';

export function AddPlayers({ onPlayersChange }) {
    const [selectPlayers, setSelectPlayers] = useState([]);
    const players = useSelector((store) => store.players);
    const allPlayers = useSelector((store) => store.allPlayers);
    const dispatch = useDispatch();

    const handleSelectionChange = (event, values) => {
        setSelectPlayers(values);
        onPlayersChange(values);
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_PLAYERS' });
    }, [dispatch]);

    console.log("players", players, "allPlayers", allPlayers)

    let searchResults = [];

// Loop through allPlayers
for(let allPlayer of allPlayers){
  
	//Look for player inside of group
	let matchArray = players.filter(player => player.user_id == allPlayer.id);
  
	//if Player is not inside group, add to searchResults array
  	if(matchArray.length == 0){
      searchResults.push(allPlayer);
    }
}

console.log("searchResults", searchResults)

    return (
        <Autocomplete
            multiple
            value={selectPlayers}
            onChange={handleSelectionChange}
            id="search-to-add-player"
            disableClearable
            options={searchResults.map((option) => ({ value: option.id, label: option.username }))}
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
                        '.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
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
