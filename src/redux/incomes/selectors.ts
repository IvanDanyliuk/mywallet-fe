import { RootStateType } from "../rootReducer";

export const selectIncomes = (state: RootStateType) => state.incomes.incomes;