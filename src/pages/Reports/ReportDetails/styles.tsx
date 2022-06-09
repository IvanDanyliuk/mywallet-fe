import { Button, List, ListItem, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const ReportDetailsContainer = styled(Box)``;

export const ReportHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReportInfo = styled(Box)``;

export const ReportTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

export const ReportPeriod = styled(Typography)`
  font-size: 14px;
`;

export const ReportComment = styled(Typography)`

`;

export const GoBackButton = styled(Button)``;

export const DataContainer = styled(Box)`
  padding: 10px 0;
  box-sizing: border-box;
`;

export const ReportSection = styled(Paper)`
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

export const SectionTitle = styled(Typography)`
  font-weight: 600;
`;

export const SectionContent = styled(Box)`
  position: relative;
  width: 100%;
  max-height: 50vh;
  display: flex;
`;

export const Diagrams = styled(Box)`
  width: 70%;
`;

export const DataList = styled(List)`
  width: 25%;
  overflow: auto;
`;

export const DataListItem = styled(ListItem)`
  font-size: 14px;
`;

export const TotalData = styled(Box)`
  width: 30%;
`;

export const Comment = styled(Typography)`
  width: 70%;
  font-size: 14px;
`;

export const TotalItem = styled(Box)`
  display: flex;
  align-items: center;
`;

export const Name = styled(Typography)`
  font-weight: 500;
`;

export const Currency = styled(Typography)`
  font-size: 14px;
`;

export const Amount = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
`;
