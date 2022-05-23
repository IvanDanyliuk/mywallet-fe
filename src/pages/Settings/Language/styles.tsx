import styled from 'styled-components';
import { MenuItem, Paper, Select, Typography } from '@mui/material';

export const Section = styled(Paper)`
  padding: 15px 20px;
  box-sizing: border-box;
`;

export const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

export const LanguageSelect = styled(Select)`
  margin-top: 20px;
  width: 200px;
`;

export const LanguageItem = styled(MenuItem)``;