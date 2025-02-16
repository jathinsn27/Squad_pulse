import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SQUADS_REQUEST,
  fetchSquadsSuccess,
  fetchSquadsFailure
} from '../actions/squadActions';

// API call function
const fetchSquadsFromApi = () => {
  return axios.get('https://435b-2607-f6d0-ced-5b4-d8ee-7f36-aa67-3099.ngrok-free.app/health_data/range?i=0&j=4');
};

// Worker saga
function* fetchSquadsSaga() {
  try {
    const response = yield call(fetchSquadsFromApi);
    console.log("response", response);
    console.log("response.data", response.data);
    yield put(fetchSquadsSuccess(response.data));
  } catch (error) {
    yield put(fetchSquadsFailure(error.message));
  }
}

// Watcher saga
export function* watchFetchSquads() {
  yield takeLatest(FETCH_SQUADS_REQUEST, fetchSquadsSaga);
}