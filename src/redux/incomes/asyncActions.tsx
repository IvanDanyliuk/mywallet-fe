import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';
import { IIncomeData } from './types';

export const getIncomes = createAsyncThunk(
  'incomes/getIncomes',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.getIncomes();
      return data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const createIncomeItem = createAsyncThunk(
  'incomes/createIncomeItem',
  async (incomeData: IIncomeData) => {
    const { data}  = await api.createIncomeItem(incomeData);
    return data;
  }
);

export const deleteIncomeItem = createAsyncThunk(
  'incomes/deleteIncomeItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteIncomeItem(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);