import { 
  Button, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  MenuItem, 
  Select, 
  TextField 
} from '@mui/material';
import styled from 'styled-components';


export const ModalBody = styled(Dialog)``;

export const ModalFormTitle = styled(DialogTitle)`
  text-align: center;
`;

export const ModalContent = styled(DialogContent)``;

export const CreationForm = styled.form`
  padding-top: 7px;
  box-sizing: border-box;
`;

export const FormContainer = styled(Grid)``;

export const FormItem = styled(Grid)``;

export const Input = styled(TextField)`
  width: 100%;
  overflow: visible;
`;

export const FormSelect = styled(Select)`
  width: 100%;
`;

export const FormOption = styled(MenuItem)``;

export const SubmitButton = styled(Button)`
  width: 100%;
`;