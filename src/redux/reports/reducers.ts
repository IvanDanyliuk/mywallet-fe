import { createSlice } from '@reduxjs/toolkit';
import { getReports, createReport, deleteReport, getReport } from './asyncActions';
import { IReportState } from './types';

const initialState: IReportState = {
  reports: [],
  openedReport: null,
  status: 'idle',
  error: null,
};


const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    sortReports: (state, action) => {
      state.reports = state.reports.sort((a: any, b: any) => {
        if(action.payload === 'asc') {
          return a.createdAt > b.createdAt ? -1 : 1;
        }
        return a.createdAt < b.createdAt ? -1 : 1;
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReports.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error'
      })
      .addCase(getReport.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.openedReport = action.payload;
      })
      .addCase(getReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error'
      })
      .addCase(createReport.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports.push(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(deleteReport.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = state.reports.filter(item => item._id !== action.meta.arg);
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { sortReports } = reportsSlice.actions;

export default reportsSlice.reducer;