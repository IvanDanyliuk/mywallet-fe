import styled from 'styled-components';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';


export const Title = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

export const ContentContainer = styled(Paper)`
  margin-top: 20px;
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const ExchangeForm = styled.form``;

export const FormContainer = styled(Grid)`
  
`;

export const FormItem = styled(Grid)``;

export const Input = styled(TextField)`
  width: 100%;
`;

export const CurrencySelect = styled(Select)`
  width: 100%;
`;

export const CurrencyItem = styled(MenuItem)``;

export const Details = styled(Grid)``;

export const DetailsSection = styled(Grid)`
  
`;

export const ResultData = styled(Box)`
  margin-top: 20px;
`;

export const PassedAmount = styled(Typography)``;

export const ResultAmount = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
`;

export const Rate = styled(Typography)`
  font-size: 14px;
`;

export const ButtonWrapper = styled(Box)`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 100%;
`;

export const ResetButton = styled(Button)`
  width: 100%;
`;