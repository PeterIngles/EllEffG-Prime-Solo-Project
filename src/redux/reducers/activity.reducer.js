  // Used to store activity returned from the server
const activityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVITY':
            return action.payload;
        case 'SET_USER_ACTIVITY':
            return action.payload;
        default:
            return state;
    }
}
  
  export default activityReducer; 