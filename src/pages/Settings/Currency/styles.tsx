import styled from 'styled-components';
import { Grid, MenuItem, Paper, Select, Typography } from '@mui/material';

export const Section = styled(Paper)`
  padding: 15px 20px;
  box-sizing: border-box;
`;

export const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

export const CurrencySelectContainer = styled(Grid)``;

export const CurrencySelectItem = styled(Grid)``;

export const CurrencySelect = styled(Select)`
  margin-top: 20px;
  width: 100%;
`;

export const CurrencyItem = styled(MenuItem)``;