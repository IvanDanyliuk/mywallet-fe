import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import UpdateAvatarModal from './UpdateAvatarModal';
import userEvent from '@testing-library/user-event';


const fileMock = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });

describe('UpdateAvatarModal tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <UpdateAvatarModal />
      </Provider>
    )
  });

  it('should upload file after clicking submit button', async () => {
    const openFormBtn = screen.getByRole('button', { name: 'updateAvatar' });
    fireEvent.click(openFormBtn);

    const fileInput = screen.getByTestId('fileInput').querySelector('input') as HTMLInputElement;
    userEvent.upload(fileInput, fileMock);
    const submitBtn = screen.getByRole('button', { name: 'updateAvatarBtn' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      //@ts-ignore
      expect(fileInput.files[0]).toEqual(fileMock);
    });
  });
});