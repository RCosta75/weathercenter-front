import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "Paris",
  temp : true
};

export const city = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity : (state,action) => {
      state.value = action.payload;
    },
    changeTemp : (state) => {
      state.temp = !state.temp
    }
  },
});

export const { changeCity, changeTemp } = city.actions;
export default city.reducer;

