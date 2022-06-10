import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/api';
import { IAuthData, ICurrencyToUpdate, ILanguageToUpdate, IPasswordToUpdate, IUserData, IUserToUpdate } from "./types";

export const signin = createAsyncThunk(
  'user/signin',
  async (userData: IAuthData, { rejectWithValue }) => {
    try {
      const { data } = await api.signIn(userData);
      localStorage.setItem('profile', JSON.stringify(data));
      localStorage.setItem('lang', JSON.stringify(data.result.language));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (userData: IUserData, { rejectWithValue }) => {
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

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (passwordData: IPasswordToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.updatePassword(passwordData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setLanguage = createAsyncThunk(
  'user/setLanguage',
  async (langData: ILanguageToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.setLanguage(langData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setCurrency = createAsyncThunk(
  'user/setCurrency',
  async (curData: ICurrencyToUpdate, { rejectWithValue }) => {
    try {
      const { data } = await api.setCurrency(curData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);