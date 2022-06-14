import React, { 
  SyntheticEvent, 
  useEffect, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';
import { updateUser } from '../../../redux/user/asyncAction';
import { selectUser } from '../../../redux/user/selectors';
import { IUserUpdationModal } from '../../../redux/general';
import { 
  FormContainer, 
  FormItem, 
  Input, 
  ModalBody, 
  ModalContent, 
  ModalFormTitle, 
  SubmitButton, 
  UpdationForm
} from './styles';


const UserUpdationModal: React.FC<IUserUpdationModal> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatchType>();
  
  const user = useSelector(selectUser);
  const token = JSON.parse(localStorage.getItem('profile') || '').token;

  const [userData, setUserData] = useState({
    ...user!,
    firstName: user!.firstName,
    lastName: user!.lastName,
    email: user!.email,
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
    localStorage.setItem('profile', JSON.stringify({ token, result: userData }));
  };

  useEffect(() => {
    if(user) {
      setUserData({
        ...user,
        firstName: user!.firstName,
        lastName: user!.lastName,
        email: user!.email,
      });
    }
  }, [dispatch]);

  return (
    <ModalBody open={open} onClose={onClose}>
      <ModalFormTitle>Update User</ModalFormTitle>
      <ModalContent>
        <UpdationForm onSubmit={handleSubmit}>
          <FormContainer container direction='column' spacing={2}>
            <FormItem item md={12}>
              <Input 
                id='firstName' 
                name='firstName' 
                label='First Name' 
                value={userData.firstName} 
                fullWidth 
                onChange={handleChange} 
              />
            </FormItem>
            <FormItem item md={12}>
              <Input 
                id='lastName' 
                name='lastName' 
                label='Last Name' 
                value={userData.lastName} 
                fullWidth 
                onChange={handleChange} 
              />
            </FormItem>
            <FormItem item md={12}>
              <Input 
                id='email' 
                name='email' 
                label='Email' 
                value={userData.email} 
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
                Update
              </SubmitButton>
            </FormItem>
          </FormContainer>
        </UpdationForm>
      </ModalContent>
    </ModalBody>
  );
};

export default UserUpdationModal;