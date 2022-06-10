export interface IExpensesState {
  expenses: IExpense[];
  status: string;
  error: null | string;
};

export interface IExpense {
  title: string;
  amount: number;
  category: string;
  description: string;
  badgeColor: string;
  createdAt: string;
  _id: string;
};

export interface IExpenseData {
  userId: string;
  title: string;
  amount: number;
  category: string;
  badgeColor: string;
  description: string;
};

export interface IExpenseToUpdate {
  id: string | undefined;
  updatedExpense: IExpenseData;
}