import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
`;

export const Section = styled(Box)`
  position: relative;
  width: 50%;
`;

export const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

export const ResultData = styled(Box)`
  position: relative;
  padding-top: 30px;
  display: flex;
`;

export const Result = styled(Typography)`
  padding: 20px;
  font-size: 24px;
  color: #24384a;
`;