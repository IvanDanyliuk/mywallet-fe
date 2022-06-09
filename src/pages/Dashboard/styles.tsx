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

export const Result = styled(Box)`
  padding: 20px 0;
  display: flex;
  align-items: flex-end;
  color: #24384a;
`;

export const Name = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

export const Currency = styled(Typography)`
  font-size: 18px;
`;

export const Amount = styled(Typography)`
  font-size: 22px;
  font-weight: 900;
  line-height: 26px;
`;