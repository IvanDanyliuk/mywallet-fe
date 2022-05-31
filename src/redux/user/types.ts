export interface IUserState {
  user: IUser | null;
  status: string;
  error: null | string;
};

export interface IUser {
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