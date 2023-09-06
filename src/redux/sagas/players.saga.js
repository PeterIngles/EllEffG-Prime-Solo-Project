import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllPlayers() {
    try {
      console.log("Inside fetchPlayers SAGA");
      const players = yield axios.get('/api/players');
      console.log('get all:', players.data);
      yield put({ type: 'SET_PLAYERS', payload: players.data });
    } catch {
      console.log('get all players error');
    }
  }
  

function* playersSaga() {
    yield takeLatest('FETCH_PLAYERS', fetchAllPlayers);
  }



export default playersSaga;