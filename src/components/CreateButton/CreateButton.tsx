import React from 'react'
import { ICreateBtn } from '../../redux/general';
import { CreateBtn } from './styles';


const CreateButton: React.FC<ICreateBtn> = ({ title, clickHandler }) => {
  return (
    <CreateBtn 
      variant='contained' 
      color='success' 
      onClick={clickHandler}
    >
      {title}
    </CreateBtn>
  );
};

export default CreateButton;