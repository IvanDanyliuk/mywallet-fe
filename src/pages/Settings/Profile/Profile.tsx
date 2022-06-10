import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserUpdationModal from '../../../components/Modals/UpdateUserModal/UserUpdationModal';
import { 
  ActionButton, 
  ButtonWrapper, 
  DataItemKey, 
  DataItemVaue, 
  PersonalInfo, 
  ProfilePhoto, 
  Section, 
  SectionTitle, 
  UpdateActions, 
  UserActions, 
  UserAvatar, 
  UserData, 
  UserDataContainer, 
  UserDataItem, 
  UserDataWrapper
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
        <UserDataContainer container spacing={3}>
          <UserData item md={6} xs={12} direction='column'>
            <UserDataWrapper container spacing={2}>
              <PersonalInfo item md={12}>
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
              </PersonalInfo>
              <UpdateActions item md={12}>
                <UserActions container spacing={2}>
                  <ButtonWrapper item md={6} xs={12} xl={3}>
                    <ActionButton 
                      variant='contained' 
                      color='success' 
                      onClick={handleUpdateUserDataClose}
                    >
                      {t('updateUserTitle')}
                    </ActionButton>
                  </ButtonWrapper>
                  <ButtonWrapper item md={6} xs={12} xl={3}>
                    <PasswordUpdationModal />
                  </ButtonWrapper>
                </UserActions>
              </UpdateActions>
            </UserDataWrapper>
          </UserData>
          <UserAvatar item md={6} xs={12} justifyContent={'center'}>
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