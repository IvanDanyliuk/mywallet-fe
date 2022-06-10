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

export const LanguageSelectContainer = styled(Grid)``;

export const LanguageSelectItem = styled(Grid)``;

export const LanguageSelect = styled(Select)`
  margin-top: 20px;
  width: 100%;
`;

export const LanguageItem = styled(MenuItem)``;