import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { UserReducer, UserState } from './slices';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  user: UserState;
}

const reducer = combineReducers({
  user: UserReducer,
});

export const store = configureStore<RootState>({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
