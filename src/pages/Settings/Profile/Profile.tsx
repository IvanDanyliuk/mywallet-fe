import React from 'react';
import { data } from '../../../helpers/data';
import { ActionButton, DataItemKey, DataItemVaue, ProfilePhoto, Section, SectionTitle, UserActions, UserAvatar, UserData, UserDataContainer, UserDataItem } from './styles';

import avatar from '../../../assets/images/avatar.jpg';

const Profile = () => {
  const userData = data.profile.user;

  return (
    <Section>
      <SectionTitle variant='inherit' >Profile</SectionTitle>
      <UserDataContainer>
        <UserData>
          <UserDataItem>
            <DataItemKey variant='inherit'>First Name</DataItemKey>
            <DataItemVaue variant='inherit'>{userData.firstName}</DataItemVaue>
          </UserDataItem>
          <UserDataItem>
            <DataItemKey variant='inherit'>Last Name</DataItemKey>
            <DataItemVaue variant='inherit'>{userData.lastName}</DataItemVaue>
          </UserDataItem>
          <UserDataItem>
            <DataItemKey variant='inherit'>Email</DataItemKey>
            <DataItemVaue variant='inherit'>{userData.email}</DataItemVaue>
          </UserDataItem>
          <UserActions>
            <ActionButton variant='contained' color='success'>Update profile</ActionButton>
            <ActionButton variant='contained' color='success'>Change password</ActionButton>
          </UserActions>
        </UserData>
        <UserAvatar>
          <ProfilePhoto 
            alt={`${userData.firstName} ${userData.lastName}`}
            src={avatar}
            sx={{ width: '100px', height: '100px' }}
          />
          <ActionButton variant='contained' color='success'>Update photo</ActionButton>
        </UserAvatar>
      </UserDataContainer>
    </Section>
  );
};

export default Profile;