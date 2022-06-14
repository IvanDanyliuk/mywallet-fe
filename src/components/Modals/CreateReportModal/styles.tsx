import { 
  Button, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  TextField 
} from '@mui/material';
import styled from 'styled-components';


export const ModalBody = styled(Dialog)``;

export const ModalFormTitle = styled(DialogTitle)`
  text-align: center;
`;

export const ModalContent = styled(DialogContent)``;

export const CreationForm = styled.form`
  padding: 5px 0;
`;

export const FormContainer = styled(Grid)``;

export const FormItem = styled(Grid)``;

export const Input = styled(TextField)`
  width: 100%;
`;

export const CreateButton = styled(Button)`
  height: 30px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;