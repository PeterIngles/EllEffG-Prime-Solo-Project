  // Used to store groups returned from the server
const groupReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_GROUPS':
            return action.payload;
        default:
            return state;
    }
}
  
  export default groupReducer;