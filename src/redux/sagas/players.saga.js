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

  function* fetchGroupPlayers(action) {
    try {
      console.log("Inside fetchGroupPlayers SAGA", action.payload);
      const players = yield axios.get(`/api/players/${action.payload}`);
      console.log('get groupPlayers:', players.data);
      yield put({ type: 'SET_PLAYERS', payload: players.data });
    } catch (error) {
      console.log('get group players error', error);
    }
}

  

function* playersSaga() {
    yield takeLatest('FETCH_PLAYERS', fetchAllPlayers);
    yield takeLatest('FETCH_GROUP_PLAYERS', fetchGroupPlayers)
  }



export default playersSaga;