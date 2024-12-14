import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {isUpdated: false}
};

export const render = createSlice({
  name: 'render',
  initialState,
  reducers: {
    reRender: (state) => {
      state.value.isUpdated = !state.value.isUpdated;
    },
  },
});

export const { reRender } = render.actions;
export default render.reducer;

