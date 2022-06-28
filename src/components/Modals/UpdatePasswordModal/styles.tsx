import { 
  Alert,
  Box,
  Button, 
  Collapse, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  IconButton, 
  TextField 
} from '@mui/material';
import styled from 'styled-components';


export const ModalBody = styled(Dialog)``;

export const ModalFormTitle = styled(DialogTitle)`
  text-align: center;
`;

export const ModalContent = styled(DialogContent)``;

export const UpdationForm = styled.form`
  padding: 5px 0;
  box-sizing: border-box;
`;

export const FormContainer = styled(Grid)``;

export const FormItem = styled(Grid)``;

export const Input = styled(TextField)`
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const ActionButton = styled(Button)`
  width: 100%;
  height: 30px;
`;

