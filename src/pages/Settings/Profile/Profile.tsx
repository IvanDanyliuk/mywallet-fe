import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserUpdationModal from '../../../components/Modals/UpdateUserModal/UserUpdationModal';
import UpdateAvatarModal from '../../../components/Modals/UpdateAvatarModal/UpdateAvatarModal';
import PasswordUpdationModal from '../../../components/Modals/UpdatePasswordModal/UpdatePasswordModal';
import { selectUser } from '../../../redux/user/selectors';
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


const Profile: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const user = useSelector(selectUser);

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
              <DataItemVaue variant='inherit'>{user?.firstName}</DataItemVaue>
            </UserDataItem>
            <UserDataItem>
              <DataItemKey variant='inherit'>{t('lastName')}</DataItemKey>
              <DataItemVaue variant='inherit'>{user?.lastName}</DataItemVaue>
            </UserDataItem>
            <UserDataItem>
              <DataItemKey variant='inherit'>{t('email')}</DataItemKey>
              <DataItemVaue variant='inherit'>{user?.email}</DataItemVaue>
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
              alt={`${user?.firstName} ${user?.lastName}`}
              src={user?.avatar}
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