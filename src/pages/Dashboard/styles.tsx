import { Box, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Grid)`
  position: relative;
  width: 100%;
`;

export const Section = styled(Grid)`
  position: relative;
  width: 50%;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

export const SectionPaper = styled(Paper)`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const ResultData = styled(Box)`
  position: relative;
  padding-top: 30px;
  display: flex;
`;

export const Result = styled(Typography)`
  
  font-size: 24px;
  color: #24384a;
`;