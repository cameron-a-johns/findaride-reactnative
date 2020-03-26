import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../models';

export interface UserState extends UserModel {
  loading: boolean;
}

const user = (): UserState => {
  return {
    name: '',
    username: '',
    loading: false,
  };
};

const beginLoadUser = (state: UserState, _action: PayloadAction) => {
  state.loading = true;
};

const finishLoadUser = (state: UserState, action: PayloadAction<UserState>) => {
  state.loading = false;
  state.name = action.payload.name;
};

const User = createSlice({
  name: 'user',
  initialState: user(),
  reducers: {
    beginLoadUser,
    finishLoadUser,
  },
});

export const { actions: UserActions, reducer: UserReducer } = User;
