import { createSlice } from '@reduxjs/toolkit';
import { createIncomeItem, deleteIncomeItem, getIncomes, updateIncomeItem } from './asyncActions';
import { IIncomesState } from './types';

const initialState: IIncomesState = {
  incomes: [],
  status: 'idle',
  error: null,
};


const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    sortIncomes: (state, action) => {
      const { key, order } = action.payload
      if(key === 'amount') {
        state.incomes = state.incomes.sort((a: any, b: any) => order === 'asc' ? a[key] - b[key] : b[key] - a[key]);
      }
      state.incomes = state.incomes.sort((a: any, b: any) => {
        if(order === 'asc') {
          return a[key] > b[key] ? -1 : 1;
        }
        return a[key] < b[key] ? -1 : 1;
      })
    }
  },
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
      .addCase(updateIncomeItem.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateIncomeItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incomes = state.incomes.map(item => item._id === action.meta.arg.id ? { ...action.meta.arg.updatedIncome, createdAt: item.createdAt, _id: item._id} : item);
      })
      .addCase(updateIncomeItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(deleteIncomeItem.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteIncomeItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incomes = state.incomes.filter(item => item._id !== action.meta.arg);
      })
      .addCase(deleteIncomeItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { sortIncomes } = incomesSlice.actions;

export default incomesSlice.reducer;