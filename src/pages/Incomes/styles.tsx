import { Box, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Box)`
  width: 100%;
  height: 70vh;
`;

export const Heading = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const PageSection = styled(Paper)`

`;

export const IncomeItem = styled(Box)`
  padding: 5px 10px;
  position: relative;
  width: 100%;
  display: flex;

  font-size: 14px;
  box-sizing: border-box;
  background: #ffffff;
  transition: .3s ease-out;

  &:hover {
    background: #e4e4e4;
  }
`;

export const Date = styled(Typography)`
  width: 10%;
`;

export const Source = styled(Typography)`
  width: 20%;
  font-size: 16px;
  font-weight: 700;
`;

export const Amount = styled(Typography)`
  width: 15%;
  font-size: 16px;
  font-weight: 700;
`;

export const Category = styled(Typography)`
  width: 20%;
`;

export const Description = styled(Typography)`
  width: 25%;
`;