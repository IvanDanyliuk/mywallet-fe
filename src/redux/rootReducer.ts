import { combineReducers } from 'redux';
import incomesReducer from './incomes/reducers';
import expensesReducer from './expenses/reducers';

const rootReducer = combineReducers({
  incomes: incomesReducer,
  expenses: expensesReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;