import { combineReducers } from 'redux';
import incomesReducer from './incomes/reducers';
import expensesReducer from './expenses/reducers';
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  incomes: incomesReducer,
  expenses: expensesReducer,
  user: userReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;