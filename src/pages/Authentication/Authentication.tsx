import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
import { useNavigate } from 'react-router-dom';


const initialState = {
  firstName: '',
  lastName: '',
  avatar: '',
  currency: 'usd',
  language: 'en',
  email: '',
  password: '',
  confirmPassword: '',
};


const Authentification: React.FC = () => {
  const { t } = useTranslation(['auth']);
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(isSignUp) {
      try {
        await dispatch(signup(formData));
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await dispatch(signin(formData));
        navigate('/');
      } catch (error) {
        console.log(error);
      };
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
        <AuthTitle variant='inherit'>{isSignUp ? t('signUpTitle') : t('signInTitle')}</AuthTitle>
        <AuthForm onSubmit={handleSubmit} data-testid='authForm'>
          <FormContainer container spacing={1}>
            {
              isSignUp && (
                <>
                  <AuthInput 
                    name='firstName' 
                    label={t('firstNameLabel')} 
                    type='text' 
                    handleChange={handleChange} 
                  />
                  <AuthInput 
                    name='lastName' 
                    label={t('lastNameLabel')} 
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
              label={t('emailLabel')} 
              type='email' 
              handleChange={handleChange} 
            />
            <AuthInput 
              name='password' 
              label={t('passwordLabel')} 
              type={showPassword ? 'text' : 'password'} 
              handleShowPassword={handleShowPassword}
              handleChange={handleChange} 
            />
            {
              isSignUp && (
                <AuthInput 
                  name='confirmPassword' 
                  label={t('confirmPasswordLabel')} 
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
              {isSignUp ? t('signUpBtn') : t('signInBtn')}
            </SubmitButton>
            <SubmitButton 
              variant='contained' 
              color='info'
              onClick={switchMode}
            >
              {isSignUp ? t('accountExistBtn') : t('noAccountBtn')}
            </SubmitButton>
            </Grid>
          </FormContainer>
        </AuthForm>
      </AuthWrapper>
    </AuthContainer>
  );
};

export default Authentification;