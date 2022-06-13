import { combineReducers } from 'redux';
import incomesReducer from './incomes/reducers';
import expensesReducer from './expenses/reducers';
import userReducer from './user/reducers';
import reportsReducer from './reports/reducers';
import exchangeReducer from './exchange/reducers';


const rootReducer = combineReducers({
  incomes: incomesReducer,
  expenses: expensesReducer,
  user: userReducer,
  reports: reportsReducer,
  exchange: exchangeReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;