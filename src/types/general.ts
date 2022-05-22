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
    date: string;
    source?: string;
    amount: number;
    category?: string;
    merchant?: string;
    description: string;
    badgeColor: string;
  }[];
  dataKey: string;
  nameKey?: string;
};