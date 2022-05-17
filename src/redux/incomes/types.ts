

export interface IIncomesState {
  incomes: IIncomes[];
  status: string;
  error: null | string;
};

export interface IIncomes {
  source: string;
  amount: number;
  category: string;
  description: string;
};

export interface IIncomeData {
  source: string;
  amount: string;
  category: string;
  description: string;
}