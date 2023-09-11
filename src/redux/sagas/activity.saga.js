import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllActivity() {
    try {
      console.log("Inside fetchActivity SAGA");
      const Activity = yield axios.get('/api/activity');
      console.log('get all:', Activity.data);
      yield put({ type: 'SET_ACTIVITY', payload: Activity.data });
    } catch {
      console.log('get all Activity error');
    }
  }
  

function* ActivitySaga() {
    yield takeLatest('FETCH_ACTIVITY', fetchAllActivity);
  
  }



export default ActivitySaga;