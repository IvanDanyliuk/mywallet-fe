import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Dashboard from './Dashboard';


describe('The Dashboard page tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  });

  it('should render total incomesbased on fetched data from the server', async () => {
    expect(await screen.findByText('3050')).toBeInTheDocument();
  });
  
  it('should render total expenses based on fetched data from the server', async () => {
    expect(await screen.findByText('190')).toBeInTheDocument();
  });
});