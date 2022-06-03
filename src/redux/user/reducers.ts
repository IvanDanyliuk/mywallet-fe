import { createSlice } from "@reduxjs/toolkit";
import { setCurrency, setLanguage, signin, signup, updatePassword, updateUser } from "./asyncAction";
import { IUserState } from "./types";

//@ts-ignore
const user = JSON.parse(localStorage.getItem('profile'));

const initialState: IUserState = {
  user: user ? user.result : null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      // localStorage.removeItem('profile');
      // localStorage.removeItem('lang');
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.result;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(signin.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.result;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(updateUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.meta.arg.userData;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //@ts-ignore
        state.user = { ...state.user, password: action.payload };
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(setLanguage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setLanguage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //@ts-ignore
        state.user = { ...state.user, language: action.payload };
      })
      .addCase(setLanguage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(setCurrency.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setCurrency.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //@ts-ignore
        state.user = { ...state.user, currency: action.payload };
      })
      .addCase(setCurrency.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;