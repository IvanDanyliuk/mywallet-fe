import React, { 
  SyntheticEvent, 
  useEffect, 
  useState 
} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';
import { updateUser } from '../../../redux/user/asyncAction';
import { 
  FormContainer, 
  Input, 
  ModalBody, 
  ModalContent, 
  ModalFormTitle, 
  SubmitButton 
} from './styles';

interface IUserUpdationModal {
  open: boolean;
  onClose: () => void;
};

const UserUpdationModal: React.FC<IUserUpdationModal> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatchType>();
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem('profile'));
  
  const [userData, setUserData] = useState({
    ...user.result,
    firstName: user.result.firstName,
    lastName: user.result.lastName,
    email: user.result.email,
  });

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser({ id: userData._id, userData }));
    localStorage.setItem('profile', JSON.stringify({ token: user.token, result: userData }));
  };

  useEffect(() => {
    if(user) {
      setUserData({
        ...user.result,
        firstName: user.result.firstName,
        lastName: user.result.lastName,
        email: user.result.email,
      });
    }
  }, [dispatch]);

  return (
    <ModalBody open={open} onClose={onClose}>
      <ModalFormTitle>Update User</ModalFormTitle>
      <ModalContent>
        <FormContainer onSubmit={handleSubmit}>
          <Input 
            id='firstName' 
            name='firstName' 
            label='First Name' 
            value={userData.firstName} 
            fullWidth 
            onChange={handleChange} 
          />
          <Input 
            id='lastName' 
            name='lastName' 
            label='Last Name' 
            value={userData.lastName} 
            fullWidth 
            onChange={handleChange} 
          />
          <Input 
            id='email' 
            name='email' 
            label='Email' 
            value={userData.email} 
            fullWidth 
            onChange={handleChange} 
          />
          <SubmitButton 
            color='primary' 
            variant='contained' 
            type='submit' 
            fullWidth
          >
            Update
          </SubmitButton>
        </FormContainer>
      </ModalContent>
    </ModalBody>
  );
};

export default UserUpdationModal;