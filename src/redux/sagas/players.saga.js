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
      yield put({ type: 'SET_GROUP_PLAYERS', payload: players.data });
      console.log('get groupPlayers:', players.data);
    } catch (error) {
      console.log('get group players error', error);
    }
}

function* postPlayers(action){
  console.log('Inside postPlayers SAGA, action.payload=', action.payload)
  yield axios.post('/api/players', action.payload)
}

function* fetchPlayers() {
  try {
    console.log("Inside fetchAllPlayers SAGA");
    const players = yield axios.get('/api/players');
    console.log('get all:', players.data);
    yield put({ type: 'SET_ALL_PLAYERS', payload: players.data });
  } catch {
    console.log('get all players error');
  }
}

  

function* playersSaga() {
    yield takeLatest('FETCH_PLAYERS', fetchAllPlayers);
    yield takeLatest('FETCH_GROUP_PLAYERS', fetchGroupPlayers)
    yield takeLatest('ADD_PLAYERS', postPlayers)
    yield takeLatest('FETCH_ALL_PLAYERS', fetchPlayers)
  }



export default playersSaga;