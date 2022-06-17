import { screen, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Incomes from './Incomes';

describe('The Incomes page tests', () => {

  it('should render the Incomes page', () => {
    render(
      <Provider store={store}>
        <Incomes />
      </Provider>
    )
    screen.debug();
  });
});












// [{"_id":"629799e37d83491f6a630f68","userId":"6295f2be26cf5e82fcc3b1ca","title":"Salary","amount":2200,"category":"Regular","description":"This is my salary per month.","badgeColor":"","createdAt":"2022-06-01T14:37:26.178Z","__v":0},{"_id":"62979a047d83491f6a630f6a","userId":"6295f2be26cf5e82fcc3b1ca","title":"Deposit revenue","amount":150,"category":"Regular","description":"Deposit interest per month.","badgeColor":"#cfb8ea","createdAt":"2022-06-04T14:37:26.178Z","__v":0},{"_id":"62979a187d83491f6a630f6c","userId":"6295f2be26cf5e82fcc3b1ca","title":"Freelance","amount":700,"category":"Non-Regular","description":"Customer's payment.","badgeColor":"#97ce8f","createdAt":"2022-06-01T14:37:26.178Z","__v":0},{"_id":"629f289cdb3eb31e042220d9","userId":"6295f2be26cf5e82fcc3b1ca","title":"Salary bonus","amount":1200,"category":"Non-Regular","description":"Bonus to month salary.","createdAt":"2022-06-07T08:25:35.443Z","__v":0},{"_id":"629f2927db3eb31e042220db","userId":"6295f2be26cf5e82fcc3b1ca","title":"Customer's subscription","amount":300,"category":"Non-Regular","description":"Customer's subscription for my new freelance project.","createdAt":"2022-06-07T08:25:35.443Z","__v":0},{"_id":"62a8499633f02592cdce7839","userId":"6295f2be26cf5e82fcc3b1ca","title":"New Income","amount":10000,"category":"Regular","description":"djsflskjdhflksjdf","badgeColor":"","createdAt":"2022-06-14T08:29:09.333Z","__v":0}]