import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatchType } from '../../../redux/store';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import { updateUser } from '../../../redux/user/asyncAction';
import { selectUser } from '../../../redux/user/selectors';
import { 
  FormContainer, 
  FormItem, 
  ModalBody, 
  ModalContent, 
  ModalFormTitle, 
  SubmitButton, 
  UpdateButton, 
  UpdationForm, 
  Uploader
} from './styles';


const UpdateAvatarModal: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch<AppDispatchType>();

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');

  const user = useSelector(selectUser);
  const token = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '').token;

  const handleUpdateAvatarClose = () => {
    setIsOpen(!isOpen);
  };

  const handleUploaderChange = (e: any) => {
    setFile(e.target.files[0]);
  }

  const uploadAvatar = (file: any) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadData = uploadBytesResumable(storageRef, file);

    uploadData.on(
      'state_changed', 
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
    if(file) {
      uploadAvatar(file);
      handleUpdateAvatarClose();
    }
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
          <UpdationForm onSubmit={handleSubmit}>
            <FormContainer container direction='column' spacing={2}>
              <FormItem item md={12}>
                <Uploader 
                  data-testid='fileInput'
                  name='avatar' 
                  type='file'
                  onChange={handleUploaderChange} 
                  fullWidth 
                />
              </FormItem>
              <FormItem item md={12}>
                <SubmitButton 
                  color='primary' 
                  variant='contained' 
                  type='submit'
                >
                  {t('updateAvatarBtn')}
                </SubmitButton>
              </FormItem>
            </FormContainer>
          </UpdationForm>
        </ModalContent>
      </ModalBody>
      <UpdateButton variant='contained' color='success' onClick={handleUpdateAvatarClose}>{t('updateAvatar')}</UpdateButton>
    </>
  );
};

export default UpdateAvatarModal;