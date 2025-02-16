import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import squadReducer from './reducers/squadReducer';
import { watchFetchSquads } from './sagas/squadSaga';

const rootReducer = combineReducers({
  squads: squadReducer
});

function* rootSaga() {
  yield all([
    watchFetchSquads()
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;