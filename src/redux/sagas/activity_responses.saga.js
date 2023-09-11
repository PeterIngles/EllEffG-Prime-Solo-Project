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

function* activity_responsesSaga() {
    yield takeLatest('FETCH_GROUP_RESPONSES', fetchGroupActivityResponses);
  }



export default activity_responsesSaga;