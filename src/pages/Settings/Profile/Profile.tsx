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
import { IUser } from '../../../redux/user/types';
import UpdateAvatarModal from '../../../components/Modals/UpdateAvatarModal/UpdateAvatarModal';

const Profile: React.FC = () => {
  //@ts-ignore
  const userData = useSelector((state: IUser) => state.user.user);

  const [isDataUpdationModalOpen, setIsDataUpdationModalOpen] = useState(false);
  // const [isAvatarUpdationModalOpen, setIsAvatarUpdationModalOpen] = useState(false);

  const handleUpdateUserDataClose = () => {
    setIsDataUpdationModalOpen(!isDataUpdationModalOpen);
  };

  // const handleUpdateAvatarClose = () => {
  //   setIsAvatarUpdationModalOpen(!isAvatarUpdationModalOpen);
  // }

  return (
    <>
      <UserUpdationModal open={isDataUpdationModalOpen} onClose={handleUpdateUserDataClose} />
      {/* <UpdateAvatarModal open={isAvatarUpdationModalOpen} onClose={handleUpdateAvatarClose} /> */}
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
              <ActionButton variant='contained' color='success' onClick={handleUpdateUserDataClose}>Update profile</ActionButton>
              <ActionButton variant='contained' color='success'>Change password</ActionButton>
            </UserActions>
          </UserData>
          <UserAvatar>
            <ProfilePhoto 
              alt={`${userData?.firstName} ${userData?.lastName}`}
              src={userData.avatar}
              sx={{ width: '100px', height: '100px' }}
            />
            {/* <ActionButton variant='contained' color='success' onClick={handleUpdateAvatarClose}>Update photo</ActionButton> */}
            <UpdateAvatarModal />
          </UserAvatar>
        </UserDataContainer>
      </Section>
    </>
  );
};

export default Profile;