import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Expenses from './Expenses';


describe('The Expenses page tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    );
  });

  it('should render fetched expenses data from the server', async () => {
    expect(await screen.findByText('Taxes payment')).toBeInTheDocument();
  });

  it('should open modal window after clicking the add button', async () => {
    const addButton = screen.getByText('createBtnTitle');
    fireEvent.click(addButton);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
});