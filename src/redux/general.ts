import { MouseEventHandler } from "react";
import { IExpense, IExpensesState } from "./expenses/types";
import { IIncome, IIncomesState } from "./incomes/types";

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
  }[] | undefined;
  dataKey: string;
  nameKey?: string;
};

export enum DataType {
  Incomes = 'incomes',
  Expenses = 'expenses'
};

export enum FormModalType {
  Incomes = 'incomes',
  Expenses = 'expenses'
};

export enum ChartParams {
  Title = 'title',
  Amount = 'amount',
  Category = 'category'
}

export enum OptionsMenuType {
  Content = 'content',
  Reports = 'reports'
};

export enum TableSortOrder {
  asc = 'asc',
  desc = 'desc',
};

export interface IOptionsMenu {
  id: string;
  type: OptionsMenuType;
  onOpen?: (id: any) => void;
  onEdit?: (id: any) => void;
  onDelete: (id: any) => void;
};

export interface ITableData {
  type: string;
  dataToRender: IIncome[] | IExpense[];
  page: number;
  rowsPerPage: number;
};

export interface ITableHeaderCell {
  type: string;
  sortKey: string;
  label: string;
  isSortable: boolean;
};

export interface IContentTableHeader {
  columns: {
    sortKey: string;
    label: string;
    isSortable: boolean;
  }[]
};

export interface IContentTable {
  type: string;
};

export interface ICreateBtn {
  title: string;
  clickHandler: MouseEventHandler;
}

export interface ICreateFormModal {
  open: boolean;
  type: string;
  id?: string;
  onClose: MouseEventHandler;
};

export interface IUserUpdationModal {
  open: boolean;
  onClose: () => void;
};

export interface IAuthInput {
  name: string;
  label: string;
  type: string;
  handleShowPassword?: (e: any) => void;
  handleChange: (e: any) => void;
};

export interface IAlert {
  isOpen: boolean;
  title: string;
  handler: () => void;
};

export interface ITextMessage {
  type: string;
};