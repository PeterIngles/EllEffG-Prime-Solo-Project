  // Used to store groups returned from the server
const groupReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GROUPS':
            return action.payload;
        default:
            return state;
    }
}
  
  export default groupReducer; 