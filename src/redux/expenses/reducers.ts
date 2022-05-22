import { createSlice } from '@reduxjs/toolkit';
import { createExpenseItem, deleteExpenseItem, getExpenses, updateExpenseItem } from './asyncActions';
import { IExpensesState } from './types';

const initialState: IExpensesState = {
  expenses: [],
  status: 'idle',
  error: null,
};


const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    sortExpenses: (state, action) => {
      const { key, order } = action.payload
      if(key === 'amount') {
        state.expenses = state.expenses.sort((a: any, b: any) => order === 'asc' ? a[key] - b[key] : b[key] - a[key]);
      }
      state.expenses = state.expenses.sort((a: any, b: any) => {
        if(order === 'asc') {
          return a[key] > b[key] ? -1 : 1;
        }
        return a[key] < b[key] ? -1 : 1;
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error'
      })
      .addCase(createExpenseItem.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createExpenseItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses.push(action.payload);
      })
      .addCase(createExpenseItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(updateExpenseItem.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateExpenseItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = state.expenses.map(item => item._id === action.meta.arg.id ? { ...action.meta.arg.updatedExpense, createdAt: item.createdAt, _id: item._id} : item);
      })
      .addCase(updateExpenseItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(deleteExpenseItem.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteExpenseItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = state.expenses.filter(item => item._id !== action.meta.arg);
      })
      .addCase(deleteExpenseItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { sortExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;