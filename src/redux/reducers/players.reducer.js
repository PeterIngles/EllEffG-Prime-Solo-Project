  // Used to store players returned from the server
const playersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return action.payload;
        default:
            return state;
    }
}
  
  export default playersReducer; 