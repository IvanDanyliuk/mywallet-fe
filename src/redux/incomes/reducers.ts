import { createSlice } from '@reduxjs/toolkit';
import { createIncomeItem, getIncomes } from './asyncActions';
import { IIncomesState } from './types';

const initialState: IIncomesState = {
  incomes: [],
  status: 'idle',
  error: null,
};


const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIncomes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getIncomes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incomes = action.payload;
      })
      .addCase(getIncomes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error'
      })
      .addCase(createIncomeItem.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createIncomeItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incomes.push(action.payload);
      })
      .addCase(createIncomeItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

// export const { createIncomeItem } = incomesSlice.actions;

export default incomesSlice.reducer;