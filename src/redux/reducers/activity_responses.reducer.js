  // Used to store groups returned from the server
const activity_responsesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GROUP_ACTIVITY_RESPONSES':
            return action.payload;
        default:
            return state;
    }
}
  
  export default activity_responsesReducer; 