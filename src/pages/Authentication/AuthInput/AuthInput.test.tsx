import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthInput from './AuthInput';


const handleShowPasswordMock = jest.fn();
const handleChangeMock = jest.fn();


describe('AuthInput tests', () => {
  it('should render the AuthInput component with the visibility icon', () => {
    render(
      <AuthInput
        name='password'
        label='Password'
        type='password'
        handleShowPassword={handleShowPasswordMock}
        handleChange={handleChangeMock}
      />
    );

    const visibilityIcon = screen.getByTestId('VisibilityIcon');
    expect(visibilityIcon).toBeInTheDocument();
  });

  it('should render the AuthInput component with the visibility off icon', () => {
    render(
      <AuthInput
        name='password'
        label='Password'
        type='text'
        handleShowPassword={handleShowPasswordMock}
        handleChange={handleChangeMock}
      />
    );
    
    const visibilityOffIcon = screen.getByTestId('VisibilityOffIcon');
    expect(visibilityOffIcon).toBeInTheDocument();
  });
});