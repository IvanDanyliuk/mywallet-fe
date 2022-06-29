import styled from 'styled-components';
import { Box, Typography } from '@mui/material';


export const MessageContainer = styled(Box)`
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #6c6c6c;
`;

export const TopText = styled(Typography)`
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

export const BottomText = styled(Typography)``;