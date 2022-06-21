import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IAuthInput } from '../../../redux/general';
import { 
  FieldAdornment, 
  FormInput, 
  InputButton, 
  InputContainer 
} from './styles';


const AuthInput: React.FC<IAuthInput> = ({ 
  name, 
  label, 
  type, 
  handleShowPassword, 
  handleChange 
}) => {
  return (
    <InputContainer item xs={12}>
      <FormInput 
        data-testid='authInput'
        name={name} 
        label={label} 
        type={type} 
        fullWidth
        onChange={handleChange} 
        InputProps={{
          endAdornment: name === 'password' && (
            <FieldAdornment position='end'>
              <InputButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </InputButton>
            </FieldAdornment>
          )
        }}
      />
    </InputContainer>
  );
};

export default AuthInput;