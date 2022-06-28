import { RootStateType } from "../rootReducer";

export const selectUser = (state: RootStateType) => state.user?.user!;

export const selectUserId = (state: RootStateType) => state.user.user?._id!;

export const selectCurrency = (state: RootStateType) => state.user.user?.currency;

