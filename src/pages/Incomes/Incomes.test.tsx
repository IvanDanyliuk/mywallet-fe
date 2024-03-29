import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Incomes from './Incomes';


describe('The Incomes page tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Incomes />
      </Provider>
    );
  });

  it('should render fetched incomes data from the server', async () => {
    expect(await screen.findByText('Deposit revenue')).toBeInTheDocument();
  });

  it('should open modal window after clicking the add button', async () => {
    const addButton = screen.getByText('createBtnTitle');
    fireEvent.click(addButton);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
});