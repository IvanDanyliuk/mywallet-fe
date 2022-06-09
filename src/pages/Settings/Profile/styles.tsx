import styled from 'styled-components';
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';

export const Section = styled(Paper)`
  padding: 15px 20px;
  box-sizing: border-box;
`;

export const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

export const UserDataContainer = styled(Grid)`
  margin-top: 10px;
  position: relative;
  width: 100%;
`;

export const UserData = styled(Grid)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserAvatar = styled(Grid)`
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

export const UserDataWrapper = styled(Grid)``;

export const PersonalInfo = styled(Grid)``;

export const UpdateActions = styled(Grid)``;

export const DataItemKey = styled(Typography)`
  width: 100px;
  color: #535353;
`;

export const DataItemVaue = styled(Typography)`
  font-weight: 600;
`;


export const UserActions = styled(Grid)``;

export const ButtonWrapper = styled(Grid)``;

export const ActionButton = styled(Button)`
  width: 100%;
  height: 30px;
`;
