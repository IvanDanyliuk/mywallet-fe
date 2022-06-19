import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/store';
import Reports from './Reports';


describe('The Reports page tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reports />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render fetched reports list from the server', async () => {
    expect(await screen.findByText('Report 1')).toBeInTheDocument();
  });
});