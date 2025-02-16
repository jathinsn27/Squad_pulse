import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SQUADS_REQUEST,
  fetchSquadsSuccess,
  fetchSquadsFailure
} from '../actions/squadActions';
import transformDataToSquads from '../transformData';

// const fetchSquadsFromApi = () => {
//   return axios.get('https://435b-2607-f6d0-ced-5b4-d8ee-7f36-aa67-3099.ngrok-free.app/health_data/range?i=0&j=4');
// };


const fetchSquadsFromApi = () => {
  return axios.get('https://435b-2607-f6d0-ced-5b4-d8ee-7f36-aa67-3099.ngrok-free.app/health_data/range?i=0&j=20', {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    withCredentials: false
  });
};

// Worker saga
function* fetchSquadsSaga() {
  try {
    const response = yield call(fetchSquadsFromApi);
    const transformedData = transformDataToSquads(response.data);
    console.log("transformedData", JSON.stringify(transformedData));
    // console.log("response", response);
    // console.log("response.data", JSON.stringify(response.data));
    yield put(fetchSquadsSuccess(transformedData));
  } catch (error) {
    yield put(fetchSquadsFailure(error.message));
  }
}

// Watcher saga
export function* watchFetchSquads() {
  yield takeLatest(FETCH_SQUADS_REQUEST, fetchSquadsSaga);
}