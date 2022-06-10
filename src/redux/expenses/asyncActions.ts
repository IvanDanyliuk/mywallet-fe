import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';
import { IExpenseData, IExpenseToUpdate } from './types';

export const getExpenses = createAsyncThunk(
  'expenses/getExpenses',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getExpenses(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const createExpenseItem = createAsyncThunk(
  'expenses/createExpenseItem',
  async (expenseData: IExpenseData) => {
    const { data }  = await api.createExpenseItem(expenseData);
    return data;
  }
);

export const updateExpenseItem = createAsyncThunk(
  'expenses/updateExpenseItem',
  async (itemToUpdate: IExpenseToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.updateExpenseItem(itemToUpdate.id, itemToUpdate.updatedExpense);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteExpenseItem = createAsyncThunk(
  'expenses/deleteExpenseItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteExpenseItem(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);