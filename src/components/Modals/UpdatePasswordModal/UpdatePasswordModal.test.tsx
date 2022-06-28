import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import UpdatePasswordModal from './UpdatePasswordModal';


const openModalForm = () => {
  const openModalBtn = screen.getByRole('button', { name: 'changePasswordBtn' });
  fireEvent.click(openModalBtn);
};


describe('UpdatePasswordModal tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <UpdatePasswordModal />
      </Provider>
    );
  });

  it('should open modal form after clicking the open button', () => {
    openModalForm();

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should submit filled form after clicking the submit button', async () => {
    openModalForm();

    const dialog = screen.queryByRole('dialog');
    const inputs = screen.getAllByTestId('formInput').map(item => item.querySelector('input') as HTMLInputElement);
    const submitBtn = screen.getByRole('button', { name: 'updateUserBtn' });

    fireEvent.change(inputs[0], { target: { value: '123456' } });
    fireEvent.change(inputs[1], { target: { value: '777777' } });
    fireEvent.change(inputs[2], { target: { value: '777777' } });
    
    await waitFor(() => {
      fireEvent.click(submitBtn);
    });

    expect(dialog).not.toBeVisible();
  });

  it('should not submit form if new password and password confirmation don\'t match', async () => {
    openModalForm();

    const inputs = screen.getAllByTestId('formInput').map(item => item.querySelector('input') as HTMLInputElement);
    const submitBtn = screen.getByRole('button', { name: 'updateUserBtn' });

    fireEvent.change(inputs[0], { target: { value: '123456' } });
    fireEvent.change(inputs[1], { target: { value: '777777' } });
    fireEvent.change(inputs[2], { target: { value: '123456' } });
    
    await waitFor(() => {
      fireEvent.click(submitBtn);
    });

    screen.debug()
  })
});