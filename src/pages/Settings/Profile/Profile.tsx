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
import PasswordUpdationModal from '../../../components/Modals/UpdatePasswordModal/UpdatePasswordModal';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation(['settings']);
  //@ts-ignore
  const userData = useSelector((state: IUser) => state.user.user);

  const [isDataUpdationModalOpen, setIsDataUpdationModalOpen] = useState(false);

  const handleUpdateUserDataClose = () => {
    setIsDataUpdationModalOpen(!isDataUpdationModalOpen);
  };

  return (
    <>
      <UserUpdationModal 
        open={isDataUpdationModalOpen} 
        onClose={handleUpdateUserDataClose} 
      />
      <Section>
        <SectionTitle variant='inherit' >{t('profileSectionTitle')}</SectionTitle>
        <UserDataContainer>
          <UserData>
            <UserDataItem>
              <DataItemKey variant='inherit'>{t('firstName')}</DataItemKey>
              <DataItemVaue variant='inherit'>{userData?.firstName}</DataItemVaue>
            </UserDataItem>
            <UserDataItem>
              <DataItemKey variant='inherit'>{t('lastName')}</DataItemKey>
              <DataItemVaue variant='inherit'>{userData?.lastName}</DataItemVaue>
            </UserDataItem>
            <UserDataItem>
              <DataItemKey variant='inherit'>{t('email')}</DataItemKey>
              <DataItemVaue variant='inherit'>{userData?.email}</DataItemVaue>
            </UserDataItem>
            <UserActions>
              <ActionButton 
                variant='contained' 
                color='success' 
                onClick={handleUpdateUserDataClose}
              >
                {t('updateUserTitle')}
              </ActionButton>
              <PasswordUpdationModal />
            </UserActions>
          </UserData>
          <UserAvatar>
            <ProfilePhoto 
              alt={`${userData?.firstName} ${userData?.lastName}`}
              src={userData.avatar}
              sx={{ width: '100px', height: '100px' }}
            />
            <UpdateAvatarModal />
          </UserAvatar>
        </UserDataContainer>
      </Section>
    </>
  );
};

export default Profile;