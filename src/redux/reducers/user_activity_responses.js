const user_activity_responsesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_ACTIVITY_RESPONSES':
          return action.payload
        default:
            return state;
    }
  }

  export default user_activity_responsesReducer