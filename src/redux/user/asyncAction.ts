import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/api';
import { IAuthData, IUser, IUserToUpdate } from "./types";

export const signin = createAsyncThunk(
  'user/signin',
  async (userData: IAuthData, { rejectWithValue }) => {
    try {
      const { data } = await api.signIn(userData);
      localStorage.setItem('profile', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(userData);
      localStorage.setItem('profile', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: IUserToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.updateUser(userData.id, userData.userData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);