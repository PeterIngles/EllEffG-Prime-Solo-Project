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
  

function* gamesSaga() {
    yield takeLatest('FETCH_GAMES', fetchAllGames);
  }



export default gamesSaga;