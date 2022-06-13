import { createSlice } from "@reduxjs/toolkit";
import { getExchangeRate } from "./asyncActions";
import { IExchangeState } from "./types";


const initialState: IExchangeState = {
  status: 'idle',
  rate: null,
  error: null
};

const exchageRate = createSlice({
  name: 'getExchangeRate',
  initialState,
  reducers: {
    reset: (state) => {
      state.rate = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExchangeRate.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getExchangeRate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rate = action.payload
      })
      .addCase(getExchangeRate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { reset } = exchageRate.actions;

export default exchageRate.reducer;