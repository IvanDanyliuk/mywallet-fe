import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import Currency from './Currency';


describe('Currency select tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Currency />
      </Provider>
    );
  });

  it('should render the Currency component', () => {
    const title = screen.getByText('currencySectionTitle')
    expect(title).toBeInTheDocument();
  });

  it('should change the currency value after selection', async () => {
    const select = screen.getByTestId('currencySelect') as HTMLElement;
    fireEvent.change(select, { target: { value: 'eur' } });
    const changedSelect = screen.getByText('EUR') as HTMLElement;
    expect(changedSelect).toBeInTheDocument();
  });
});