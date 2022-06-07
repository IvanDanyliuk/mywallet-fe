import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/api';
import { IReportData, IReportToUpdate } from './types';

export const getReports = createAsyncThunk(
  'reports/getReports',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.getReports(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createReport = createAsyncThunk(
  'reports/createReport',
  async (reportData: IReportData) => {
    const { data} = await api.createReport(reportData);
    return data;
  }
);

export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteReport(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);