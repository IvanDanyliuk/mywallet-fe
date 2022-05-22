

export interface IIncomesState {
  incomes: IIncomes[];
  status: string;
  error: null | string;
};

export interface IIncomes {
  title: string;
  amount: string;
  category: string;
  description: string;
  createdAt: string;
  _id: string;
};

export interface IIncomeData {
  title: string;
  amount: string;
  category: string;
  badgeColor: string;
  description: string;
};

export interface IIncomeToUpdate {
  id: string | undefined;
  updatedIncome: IIncomeData;
}

