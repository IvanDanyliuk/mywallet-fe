

export interface IIncomesState {
  incomes: IIncome[];
  status: string;
  error: null | string;
};

export interface IIncome {
  userId: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  badgeColor: string;
  createdAt: string;
  _id: string;
};

export interface IIncomeData {
  userId: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  badgeColor: string;
};

export interface IIncomeToUpdate {
  id: string | undefined;
  updatedIncome: IIncomeData;
}

