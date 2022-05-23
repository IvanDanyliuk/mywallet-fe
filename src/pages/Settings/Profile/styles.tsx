import styled from 'styled-components';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';

export const Section = styled(Paper)`
  padding: 15px 20px;
  box-sizing: border-box;
`;

export const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

export const UserDataContainer = styled(Box)`
  margin-top: 10px;
  position: relative;
  width: 100%;
  display: flex;
`;

export const UserData = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserAvatar = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ProfilePhoto = styled(Avatar)`
  margin-right: 20px;
`;

export const UserDataItem = styled(Box)`
  display: flex;
`;

export const DataItemKey = styled(Typography)`
  width: 150px;
  color: #535353;
`;

export const DataItemVaue = styled(Typography)`
  font-weight: 600;
`;


export const UserActions = styled(Box)`
  margin-top: 20px;
  max-width: 420px;
  display: flex;
  justify-content: space-between;
`;

export const ActionButton = styled(Button)`
  width: 200px;
  height: 30px;
`;
