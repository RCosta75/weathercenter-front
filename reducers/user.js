import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email : null },
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connect: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
    },
  },
});

export const { connect, logout } = user.actions;
export default user.reducer;