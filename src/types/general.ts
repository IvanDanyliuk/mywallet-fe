import { IExpensesState } from "../redux/expenses/types";
import { IIncomesState } from "../redux/incomes/types";

export interface IState {
  incomes: IIncomesState;
  expenses: IExpensesState;
  profile: {};
};

export interface ILayout {
  children: React.ReactNode
};

export interface IChart {
  data: {
    amount: number;
    category?: string;
    badgeColor: string;
  }[];
  dataKey: string;
  nameKey?: string;
};