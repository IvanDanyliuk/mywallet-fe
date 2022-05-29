import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserUpdationModal from '../../../components/Modals/UpdateUserModal/UserUpdationModal';
import { 
  ActionButton, 
  DataItemKey, 
  DataItemVaue, 
  ProfilePhoto, 
  Section, 
  SectionTitle, 
  UserActions, 
  UserAvatar, 
  UserData, 
  UserDataContainer, 
  UserDataItem 
} from './styles';
import avatar from '../../../assets/images/avatar.jpg';
import { IUser } from '../../../redux/user/types';

const Profile: React.FC = () => {
  //@ts-ignore
  const userData = useSelector((state: IUser) => state.user.user);

  const [isUpdationModalOpen, setIsUpdationModalOpen] = useState(false);

  const handleClose = () => {
    setIsUpdationModalOpen(!isUpdationModalOpen);
  };

  console.log(userData.avatar)

  return (
    <>
      <UserUpdationModal open={isUpdationModalOpen} onClose={handleClose} />
      <Section>
        <SectionTitle variant='inherit' >Profile</SectionTitle>
        <UserDataContainer>
          <UserData>
            <UserDataItem>
              <DataItemKey variant='inherit'>First Name</DataItemKey>
              <DataItemVaue variant='inherit'>{userData?.firstName}</DataItemVaue>
            </UserDataItem>
            <UserDataItem>
              <DataItemKey variant='inherit'>Last Name</DataItemKey>
              <DataItemVaue variant='inherit'>{userData?.lastName}</DataItemVaue>
            </UserDataItem>
            <UserDataItem>
              <DataItemKey variant='inherit'>Email</DataItemKey>
              <DataItemVaue variant='inherit'>{userData?.email}</DataItemVaue>
            </UserDataItem>
            <UserActions>
              <ActionButton variant='contained' color='success' onClick={handleClose}>Update profile</ActionButton>
              <ActionButton variant='contained' color='success'>Change password</ActionButton>
            </UserActions>
          </UserData>
          <UserAvatar>
            <ProfilePhoto 
              alt={`${userData?.firstName} ${userData?.lastName}`}
              src={userData.avatar}
              sx={{ width: '100px', height: '100px' }}
            />
            <ActionButton variant='contained' color='success'>Update photo</ActionButton>
          </UserAvatar>
        </UserDataContainer>
      </Section>
    </>
  );
};

export default Profile;