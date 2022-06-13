import { RootStateType } from "../rootReducer";

export const selectExchangeData = (state: RootStateType) => state.exchange.rate?.data;