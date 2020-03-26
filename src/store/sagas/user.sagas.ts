import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserActions } from '../slices';
import { UserApi, ApiClient } from '../../utilities';

function* loadUser(action: PayloadAction<string>) {
  const api = new UserApi(ApiClient.getInstance());
  const result = yield call(api.checkUser, action.payload);

  yield put(UserActions.finishLoadUser(result));
}

export function* userSagas() {
  yield takeLatest(UserActions.beginLoadUser.toString(), loadUser);
}
