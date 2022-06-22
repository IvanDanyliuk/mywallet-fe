import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/store';
import Authentication from './Authentication';


const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const fileMock = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });


describe('The Authentication page tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render authentication form', () => {
    const authForm = screen.getByTestId('authForm');
    expect(authForm).toBeInTheDocument();
  });

  it('should submit the signin form after filling inputs', async () => {
    const inputs = screen.getAllByTestId('authInput').map(item => item.querySelector('input') as HTMLInputElement);
    const signInBtn = screen.getByText('signInBtn');

    fireEvent.change(inputs[0], { target: { value: 'j.doe@gmail.com' } });
    fireEvent.change(inputs[1], { target: { value: '123456' } });
    fireEvent.click(signInBtn);
    
    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });

  it('should submit signup form after filling inputs', async () => {
    const switchToSignUpBtn = screen.getByText('noAccountBtn')
    fireEvent.click(switchToSignUpBtn);

    const inputs = screen.getAllByTestId('authInput').map(item => item.querySelector('input') as HTMLInputElement);
    fireEvent.change(inputs[0], { target: { value: 'Trent' } });
    fireEvent.change(inputs[1], { target: { value: 'Alexander-Arnold' } });
    fireEvent.change(inputs[2], { target: { files: [fileMock] } });
    fireEvent.change(inputs[3], { target: { value: 't.a.arnold@gmail.com' } });
    fireEvent.change(inputs[4], { target: { value: '123456' } });
    fireEvent.change(inputs[5], { target: { value: '123456' } });

    await waitFor(() => {
      const visibilityIcon = screen.getByTestId('VisibilityIcon');
      fireEvent.click(visibilityIcon);
    });
    
    const signUpBtn = screen.getByText('signUpBtn');
    fireEvent.click(signUpBtn);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });
});