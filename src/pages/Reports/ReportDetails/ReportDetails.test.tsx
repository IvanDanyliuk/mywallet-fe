import { screen, render, fireEvent, waitForElementToBeRemoved, findByRole, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../../redux/store';
import ReportDetails from './ReportDetails';


const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Report Details tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReportDetails />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render report title', async () => {
    expect(await screen.findByText('Report 1')).toBeInTheDocument();
  });

  it('should navigate to previous page after clicking the \'Go Back\' button', async () => {
    const goBackBtn = screen.getByRole('button', { name: 'goBackBtn' });
    fireEvent.click(goBackBtn);
    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});