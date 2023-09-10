  // Used to store games returned from the server
const gamesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GAMES':
            return action.payload;
        case 'SET_USER_GAMES':
            return action.payload;
        default:
            return state;
    }
}
  
  export default gamesReducer; 