import { RootStateType } from "../rootReducer";

export const selectExpenses = (state: RootStateType) => state.expenses.expenses;