import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { TextField, Autocomplete, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { SearchPlayers } from './SearchPlayers'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';

function CreateGroupPage() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const games = useSelector((store) => store.games);

    const history = useHistory();

    

    const [groupName, setGroupName] = useState('');
    const [selectGames, setSelectGames] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [options, setOptions] = useState(games.map((option) => ({ value: option.id, label: option.title })));

    


    const theme = createTheme({
        palette: {
            primary: {
                main: '#ffffff',  // white color
            },
        },
    });


    const handleSelectionChange = (event, values) => {
      setSelectGames(values);
    
      const filteredOptions = options.filter(
        (option) => !values.find((selected) => selected.value === option.value)
      );
      setOptions(filteredOptions);
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handlePlayersChange = (selectedPlayers) => {
        setSelectedPlayers(selectedPlayers);
    };

    const postGroup = () => {
        console.log("clicked on AddGroup")
        dispatch({
            type: 'ADD_GROUP', payload: {
                groupName: groupName,
                selectGames: selectGames,
                selectedPlayers: selectedPlayers
            }
        }
        )
        history.push('/user')
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_GAMES' });
        dispatch({ type: 'FETCH_PLAYERS' })
        console.log("GAMES and PLAYERS", games)
    }, []);

    return (
        <div style={{padding: '1em' }} id="create-group-form">
            <h1>CREATE GROUP</h1>
            <ul></ul>
            <TextField
                fullWidth
                onChange={handleGroupNameChange}
                value={groupName}
                required
                id="filled-required"
                label="Group Name"
                placeholder="Group Name"
                variant="filled"
                sx={{
                    '.MuiFormLabel-root': { color: '#ffffff' },
                    '.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                }}
                InputProps={{
                    style: { color: 'white' }
                }}
            />
            
            <Autocomplete
      multiple
      value={selectGames}
      onChange={handleSelectionChange}
      id="search-to-add-player"
      disableClearable
      sx={{
        paddingTop: '1em'
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) =>  (
    <TextField
      {...params}
      label="Search games"
      InputProps={{
        style: { color: 'white' },
        ...params.InputProps,
        type: 'search',
      }}
      sx={{
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
            <Box sx={{ padding: 1 }} />
            <SearchPlayers onPlayersChange={handlePlayersChange} />
            <Box sx={{ padding: 1 }} />

            <Button onClick={postGroup} variant="contained" endIcon={<GroupAddIcon />}>
                ADD GROUP
            </Button>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default CreateGroupPage;

