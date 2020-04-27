import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createMemoryHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { UserReducer, UserState } from './slices';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const history = createMemoryHistory();

export interface RootState {
  user: UserState;
  router: any;
}

const reducer = combineReducers({
  user: UserReducer,
  router: connectRouter(history),
});

export const store = configureStore<RootState>({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
