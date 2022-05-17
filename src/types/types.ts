import { IIncomesState } from "../redux/incomes/types";

export interface IState {
  incomes: IIncomesState;
  expenses: [];
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