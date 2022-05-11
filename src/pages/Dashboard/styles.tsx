import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Box)`

`;

export const ChartGroup = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Dynamic = styled(Box)`
  padding-top: 30px;
  display: flex;
`;

export const ResultData = styled(Box)`
  position: relative;
  padding-top: 30px;
  display: flex;
`;

export const Result = styled(Typography)`
  width: 50%;
  font-size: 24px;
  text-align: center;
  color: #24384a;
`;