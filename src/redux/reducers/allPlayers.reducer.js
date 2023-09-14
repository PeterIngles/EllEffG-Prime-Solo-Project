const allPlayersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_PLAYERS':
            return action.payload;
        default:
            return state;
    }
}
  
  export default allPlayersReducer; 