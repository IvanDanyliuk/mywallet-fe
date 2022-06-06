import { createSlice } from '@reduxjs/toolkit';
import { getReports, createReport, updateReport, deleteReport } from './asyncActions';
import { IReportState } from './types';

const initialState: IReportState = {
  reports: [],
  status: 'idle',
  error: null,
};


const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
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
      .addCase(updateReport.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = [];
      })
      .addCase(updateReport.rejected, (state, action) => {
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

export default reportsSlice.reducer;