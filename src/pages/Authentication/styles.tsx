import { Box, Button, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

export const AuthContainer = styled(Box)`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthWrapper = styled(Paper)`
  width: 350px;
  padding: 10px;
  background: #a9a9a9;
`;

export const AuthForm = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled(Grid)``;

export const AuthTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const FileInput = styled(TextField)`
  margin-top: 10px;
`;

export const FileInputWrapper = styled(Box)``;

export const SubmitButton = styled(Button)`
  width: 100%;
`;