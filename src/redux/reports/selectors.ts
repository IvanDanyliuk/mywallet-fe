import { RootStateType } from "../rootReducer";

export const selectReports = (state: RootStateType) => state.reports?.reports;

export const selectReport = (state: RootStateType) => state.reports?.openedReport;