import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SQUADS_REQUEST,
  fetchSquadsSuccess,
  fetchSquadsFailure
} from '../actions/squadActions';

// API call function
const fetchSquadsFromApi = () => {
  return axios.get('YOUR_API_ENDPOINT_HERE');
};

// Worker saga
function* fetchSquadsSaga() {
  try {
    const response = yield call(fetchSquadsFromApi);
    yield put(fetchSquadsSuccess(response.data));
  } catch (error) {
    yield put(fetchSquadsFailure(error.message));
  }
}

// Watcher saga
export function* watchFetchSquads() {
  yield takeLatest(FETCH_SQUADS_REQUEST, fetchSquadsSaga);
}