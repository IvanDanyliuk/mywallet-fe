import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import { updateUser } from '../../../redux/user/asyncAction';
import { FormContainer, Input, ModalBody, ModalContent, ModalFormTitle, SubmitButton } from './styles';
import { Button } from '@mui/material';

const UpdateAvatarModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleUpdateAvatarClose = () => {
    setIsOpen(!isOpen);
  }

  const dispatch = useDispatch<AppDispatchType>();
  const user = JSON.parse(localStorage.getItem('profile') || '');
  const [progressPercent, setProgressPercent] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');

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
          id: user.result.id, 
          userData: { ...user.result, avatar: avatarUrl }
        })
      );
      localStorage.setItem('profile', JSON.stringify({ token: user.token, result: { ...user.result, avatar: avatarUrl } }))
    }
    setAvatarUrl('')
  }, [avatarUrl]);

  return (
    <>
      <ModalBody open={isOpen} onClose={handleUpdateAvatarClose}>
        <ModalFormTitle>Update Avatar</ModalFormTitle>
        <ModalContent>
          <FormContainer onSubmit={handleSubmit}>
            <Input name='avatar' type='file' fullWidth />
            <SubmitButton color='primary' variant='contained' type='submit'>Update</SubmitButton>
          </FormContainer>
        </ModalContent>
      </ModalBody>
      <Button onClick={handleUpdateAvatarClose}>Update photo</Button>
    </>
  );
};

export default UpdateAvatarModal;