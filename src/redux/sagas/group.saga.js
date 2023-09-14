import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserGroups(action) {
    try {
      console.log("Inside fetchUserGroup SAGA. action.payload=", action.payload);
      const groups = yield axios.get('/api/groups/id', { params: action.payload });
      console.log('get all:', groups.data);
      yield put({ type: 'SET_GROUPS', payload: groups.data });
    } catch {
      console.log('get all groups error');
    }
  }

  function* postGroup(action){
    console.log('Inside postgroups SAGA, action.payload=', action.payload)
    yield axios.post('/api/groups', action.payload)
}
  

function* groupsSaga() {
    yield takeLatest('FETCH_GROUPS', fetchUserGroups);
    yield takeLatest('ADD_GROUP', postGroup)
  }



export default groupsSaga;