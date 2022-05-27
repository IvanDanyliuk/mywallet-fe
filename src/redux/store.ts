import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer, { RootStateType } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppThunkType = ThunkAction<
  void,
  RootStateType,
  unknown,
  Action<string>
>;

export type AppDispatchType = typeof store.dispatch;

export default store;