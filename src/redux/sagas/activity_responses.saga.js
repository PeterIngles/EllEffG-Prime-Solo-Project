import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGroupActivityResponses(action) {
    try {
      console.log("Inside fetchGroupActivtyResponses SAGA. action.payload=", action.payload);
      const responses = yield axios.get('/api/activity_responses/id/id', { params: action.payload });
      console.log('get all group activity_responses:', responses.data);
      yield put({ type: 'SET_GROUP_ACTIVITY_RESPONSES', payload: responses.data });
    } catch {
      console.log('GET group activity_responses error');
    }
  }

  function* fetchUserActivityResponses(action) {
    try {
      console.log("Inside fetchUserActivtyResponses SAGA. action.payload=", action.payload);
      const responses = yield axios.get('/api/activity_responses/', { params: action.payload });
      console.log('get all group activity_responses:', responses.data);
      yield put({ type: 'SET_USER_ACTIVITY_RESPONSES', payload: responses.data });
    } catch {
      console.log('GET group activity_responses error');
    }
  }

// ADDICH ON YIELD
function* postResponse(action){
   try{
  console.log('Inside postResponse SAGA, action.payload=', action.payload)
    yield axios.post('/api/activity_responses', action.payload)
    yield put({type: 'FETCH_GROUP_RESPONSES', payload: action.payload})}
    catch{
      console.log('POST group activity_responses error');
    }
}

function* deleteResponse(action){
  console.log('Inside deleteResponse SAGA, action.payload=', action.payload)
  try{
  yield axios.delete('/api/activity_responses', {data: action.payload})
  yield put({type: 'FETCH_GROUP_RESPONSES', payload: action.payload})
  }
  catch{
    console.log('DELETE group activity_responses error');
  }
}

function* editResponse(action){
  console.log('Inside editResponse SAGA, action.payload=', action.payload)
  try{
  yield axios.put('/api/activity_responses', {data: action.payload})
  // yield put({type: 'FETCH_GROUP_RESPONSES', payload: action.payload})
  }
    catch{
      console.log('POST group activity_responses error');
    }
}

function* activity_responsesSaga() {
    yield takeLatest('FETCH_GROUP_RESPONSES', fetchGroupActivityResponses);
    yield takeLatest('FETCH_USER_ACTIVITY_RESPONSES', fetchUserActivityResponses)
    yield takeLatest('ADD_RESPONSE', postResponse)
    yield takeLatest('DELETE_RESPONSE', deleteResponse)
    yield takeLatest('EDIT_RESPONSE', editResponse)
  }



export default activity_responsesSaga;