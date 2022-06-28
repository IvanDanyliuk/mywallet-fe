import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/store';
import Navigation from './Navigation';


const mockedStore = {
  ...store.getState(),
  user: {
    user: {
      _id: '6295f2be26cf5e82fcc3b1ca',
      firstName: 'Johnny',
      lastName: 'Doe',
      email: 'j.doe@gmail.com',
      password: '$2a$12$VSqDjXVvCD0d7bl9sXVGUeTQOmt33f303Hr7GuppVT2.NulxaCoJ.',
      avatar: 'https://firebasestorage.googleapis.com/v0/b/my-wallet-be092.appspot.com/o/files%2Favatar.jpg?alt=media&token=a70f3ac4-20fb-454a-ac24-6781c855bc72',
      language: 'ua',
      currency: 'usd',
      __v: 0,
    },
    status: 'succeeded',
    error: null,
  },
};

store.getState = () => mockedStore;

const mockedUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedUseDispatch,
}));


describe('Navigation tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render the Navigation component', () => {
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBe(6);
  });

  it('should change the page after clicking the logout button', async () => {
    const logoutBtn = screen.getByRole('button', { name: 'logoutBtn' });
    fireEvent.click(logoutBtn);
    await waitFor(() => {
      expect(mockedUseDispatch).toHaveBeenCalled();
    });
  });
});