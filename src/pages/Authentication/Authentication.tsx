import { Grid } from '@mui/material';
import React, { useState } from 'react'
import AuthInput from './AuthInput/AuthInput';
import { AuthContainer, AuthForm, AuthTitle, AuthWrapper, FormContainer, SubmitButton } from './styles';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Authentification: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(isSignUp) {
      console.log('Signed Up', formData);
    } else {
      console.log('Signed In', formData);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (e: any) => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <AuthContainer>
      <AuthWrapper elevation={22}>
        <AuthTitle variant='inherit'>{isSignUp ? 'Sign Up' : 'Sign In'}</AuthTitle>
        <AuthForm onSubmit={handleSubmit}>
          <FormContainer container spacing={1}>
            {
              isSignUp && (
                <>
                  <AuthInput 
                    name='firstName' 
                    label='First Name' 
                    type='text' 
                    handleChange={handleChange} 
                  />
                  <AuthInput 
                    name='lastName' 
                    label='Last Name' 
                    type='text' 
                    handleChange={handleChange} 
                  />
                </>
              )
            }
            <AuthInput 
              name='email' 
              label='Email' 
              type='email' 
              handleChange={handleChange} 
            />
            <AuthInput 
              name='password' 
              label='Password' 
              type={showPassword ? 'text' : 'password'} 
              handleShowPassword={handleShowPassword}
              handleChange={handleChange} 
            />
            {
              isSignUp && (
                <AuthInput 
                  name='confirmPassword' 
                  label='Confirm Password' 
                  type='password' 
                  handleChange={handleChange} 
                />
              )
            }
          
            <Grid item>
            <SubmitButton 
              variant='contained' 
              color='success' 
              type='submit' 
              style={{marginBottom: '10px'}}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </SubmitButton>
            <SubmitButton 
              variant='contained' 
              color='info'
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
            </SubmitButton>
            </Grid>
          </FormContainer>
        </AuthForm>
        
      </AuthWrapper>
    </AuthContainer>
  );
};

export default Authentification;