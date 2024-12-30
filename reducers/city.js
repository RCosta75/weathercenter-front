import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "Paris",
  temp : true,
  country : "FR",
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
    },
    changeCountry : (state,action) => {
      state.country = action.payload
    }
  },
});

export const { changeCity, changeTemp, changeCountry } = city.actions;
export default city.reducer;

