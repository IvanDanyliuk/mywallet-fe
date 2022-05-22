

export interface IExpensesState {
  expenses: IExpenses[];
  status: string;
  error: null | string;
};

export interface IExpenses {
  title: string;
  amount: string;
  category: string;
  description: string;
  createdAt: string;
  _id: string;
};

export interface IExpenseData {
  title: string;
  amount: string;
  category: string;
  badgeColor: string;
  description: string;
};

export interface IExpenseToUpdate {
  id: string | undefined;
  updatedExpense: IExpenseData;
}

