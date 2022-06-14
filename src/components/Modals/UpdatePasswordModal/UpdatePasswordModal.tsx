import React, { 
  SyntheticEvent, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatchType } from '../../../redux/store';
import { updatePassword } from '../../../redux/user/asyncAction';
import { selectUser } from '../../../redux/user/selectors';
import { 
  ActionButton,
  FormContainer, 
  FormItem, 
  Input, 
  ModalBody, 
  ModalContent, 
  ModalFormTitle, 
  SubmitButton, 
  UpdationForm
} from './styles';


const PasswordUpdationModal: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch<AppDispatchType>();
  const user = useSelector(selectUser);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    curPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e: any) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    if(passwordData.newPassword === passwordData.confirmNewPassword) {
      dispatch(updatePassword({ 
        id: user!._id, 
        curPassword: passwordData.curPassword, 
        newPassword: passwordData.newPassword 
      }));

      setPasswordData({
        curPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });

      handleModalOpen();
    } else {
      alert('Passwords don\'t match.');
    }
  };

  return (
    <>
      <ModalBody open={isModalOpen} onClose={handleModalOpen}>
        <ModalFormTitle>{t('changePasswordBtn')}</ModalFormTitle>
        <ModalContent>
          <UpdationForm onSubmit={handleSubmit}>
            <FormContainer container direction='column' spacing={2}>
              <FormItem item md={12}>
                <Input 
                  id='curPassword' 
                  name='curPassword' 
                  label={t('curPassField')} 
                  type='password' 
                  value={passwordData.curPassword} 
                  required
                  fullWidth 
                  onChange={handleChange} 
                />
              </FormItem>
              <FormItem item md={12}>
                <Input 
                  id='newPassword' 
                  name='newPassword' 
                  label={t('newPassField')} 
                  type='password' 
                  value={passwordData.newPassword} 
                  required
                  fullWidth 
                  onChange={handleChange} 
                />
              </FormItem>
              <FormItem item md={12}>
                <Input 
                  id='confirmNewPassword' 
                  name='confirmNewPassword' 
                  label={t('confirmNewPass')} 
                  type='password' 
                  value={passwordData.confirmNewPassword} 
                  required
                  fullWidth 
                  onChange={handleChange} 
                />
              </FormItem>
              <FormItem item md={12}>
                <SubmitButton 
                  color='primary' 
                  variant='contained' 
                  type='submit' 
                  fullWidth
                >
                  {t('updateUserBtn')}
                </SubmitButton>
              </FormItem>
            </FormContainer>
          </UpdationForm>
        </ModalContent>
      </ModalBody>
      <ActionButton 
        variant='contained' 
        color='success'
        onClick={handleModalOpen}
      >
        {t('changePasswordBtn')}
      </ActionButton>
    </>
  );
};

export default PasswordUpdationModal;