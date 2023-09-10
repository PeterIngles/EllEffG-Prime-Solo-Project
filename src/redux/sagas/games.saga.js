import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllGames() {
    try {
      console.log("Inside fetchGames SAGA");
      const games = yield axios.get('/api/games');
      console.log('get all:', games.data);
      yield put({ type: 'SET_GAMES', payload: games.data });
    } catch {
      console.log('get all games error');
    }
  }

  function* fetchUserGames(action) {
    try {
      console.log("Inside fetchUserGroup SAGA. action.payload=", action.payload);
      const games = yield axios.get('/api/games/id', { params: action.payload });
      console.log('get user games:', games.data);
      yield put({ type: 'SET_USER_GAMES', payload: games.data });
    } catch {
      console.log('get user games error');
    }
  }
  

function* gamesSaga() {
    yield takeLatest('FETCH_GAMES', fetchAllGames);
    yield takeLatest('FETCH_USER_GAMES', fetchUserGames)
  }



export default gamesSaga;