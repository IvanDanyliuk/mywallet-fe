import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import styled from 'styled-components';

export const ModalBody = styled(Dialog)``;

export const ModalFormTitle = styled(DialogTitle)`
  text-align: center;
`;

export const ModalContent = styled(DialogContent)``;

export const FormContainer = styled.form`
  padding: 5px 0;
  min-width: 300px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const Input = styled(TextField)``;

export const CreateButton = styled(Button)`
  height: 30px;
`;

export const SubmitButton = styled(Button)``;