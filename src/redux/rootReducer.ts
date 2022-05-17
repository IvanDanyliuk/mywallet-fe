import { combineReducers } from 'redux';
import incomesReducer from './incomes/reducers';

const rootReducer = combineReducers({
  incomes: incomesReducer
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;