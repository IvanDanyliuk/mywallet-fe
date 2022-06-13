import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/api';
import { IExchangeData } from "./types";

export const getExchangeRate = createAsyncThunk(
  'exchange/getExchangeRate',
  async (exchangeData: IExchangeData, { rejectWithValue }) => {
    try {
      const rate = api.getExchangeRate(exchangeData);
      return rate;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);