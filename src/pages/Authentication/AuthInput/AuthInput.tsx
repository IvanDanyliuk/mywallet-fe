import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { 
  FieldAdornment, 
  FormInput, 
  InputButton, 
  InputContainer 
} from './styles';

interface IAuthInput {
  name: string;
  label: string;
  type: string;
  handleShowPassword?: (e: any) => void;
  handleChange: (e: any) => void;
};

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