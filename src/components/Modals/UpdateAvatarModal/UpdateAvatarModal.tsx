import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppDispatchType } from '../../../redux/store';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import { updateUser } from '../../../redux/user/asyncAction';
import { FormContainer, Input, ModalBody, ModalContent, ModalFormTitle, SubmitButton } from './styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/selectors';


const UpdateAvatarModal: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch<AppDispatchType>();

  const [isOpen, setIsOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');

  const user = useSelector(selectUser);
  const token = JSON.parse(localStorage.getItem('profile') || '').token;

  const handleUpdateAvatarClose = () => {
    setIsOpen(!isOpen);
  };

  const uploadAvatar = (file: any) => {
    if(!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadData = uploadBytesResumable(storageRef, file);

    uploadData.on('state_changed', 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const url = await getDownloadURL(uploadData.snapshot.ref);
        setAvatarUrl(url)
      }
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    uploadAvatar(file);
    handleUpdateAvatarClose();
  };

  useEffect(() => {
    if(avatarUrl) {
      dispatch(
        updateUser({
          id: user!._id, 
          userData: { ...user!, avatar: avatarUrl }
        })
      );
      localStorage.setItem('profile', JSON.stringify({ token, result: { ...user, avatar: avatarUrl } }))
    }
    setAvatarUrl('')
  }, [avatarUrl]);

  return (
    <>
      <ModalBody 
        open={isOpen} 
        onClose={handleUpdateAvatarClose}
      >
        <ModalFormTitle>{t('updateAvatarTitle')}</ModalFormTitle>
        <ModalContent>
          <FormContainer onSubmit={handleSubmit}>
            <Input 
              name='avatar' 
              type='file' 
              fullWidth 
            />
            <SubmitButton 
              color='primary' 
              variant='contained' 
              type='submit'
            >
              {t('updateAvatarBtn')}
            </SubmitButton>
          </FormContainer>
        </ModalContent>
      </ModalBody>
      <Button onClick={handleUpdateAvatarClose}>{t('updateAvatar')}</Button>
    </>
  );
};

export default UpdateAvatarModal;