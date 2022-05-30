import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import { AppDispatchType } from '../../redux/store';
import { signup, signin } from '../../redux/user/asyncAction';
import AuthInput from './AuthInput/AuthInput';
import { 
  AuthContainer, 
  AuthForm, 
  AuthTitle, 
  AuthWrapper,  
  FormContainer, 
  SubmitButton 
} from './styles';

const initialState = {
  firstName: '',
  lastName: '',
  avatar: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Authentification: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [progressPercent, setProgressPercent] = useState(0);
  const dispatch = useDispatch<AppDispatchType>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(isSignUp) {
      dispatch(signup(formData));
    } else {
      dispatch(signin(formData));
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadFileChange = (e: any) => {
    e.preventDefault();

    const file = e.target?.files[0];
    if(!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadData = uploadBytesResumable(storageRef, file);

    uploadData.on('state_changed', 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadData.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formData,
            avatar: downloadUrl
          });
        })
      }
    );
  }

  const handleShowPassword = (e: any) => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
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
                  <AuthInput 
                    name='avatar' 
                    label='' 
                    type='file' 
                    handleChange={handleUploadFileChange} 
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
              onClick={switchMode}
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