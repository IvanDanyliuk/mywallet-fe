export interface IUserState {
  user: IUser | null;
  status: string;
  error: null | string;
};

export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export interface IUserToUpdate {
  id: string;
  userData: IUser;
};