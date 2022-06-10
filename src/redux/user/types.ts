export interface IUserState {
  user: IUser | null;
  status: string;
  error: null | string;
};

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  currency: string;
  language: string;
  email: string;
  password: string;
};

export interface IUserData {
  firstName: string;
  lastName: string;
  avatar?: string;
  currency: string;
  language: string;
  email: string;
  password: string;
};

export interface IUserToUpdate {
  id: string;
  userData: IUser;
};

export interface IAuthData {
  email: string;
  password: string;
};

export interface IPasswordToUpdate {
  id: string;
  curPassword: string;
  newPassword: string;
};

export interface ILanguageToUpdate {
  id: string;
  language: string;
};

export interface ICurrencyToUpdate {
  id: string;
  currency: string;
};
