import React, { MouseEventHandler } from 'react'
import { CreateBtn } from './styles';

interface ICreateBtn {
  title: string;
  clickHandler: MouseEventHandler;
}

const CreateButton: React.FC<ICreateBtn> = ({ title, clickHandler }) => {
  return (
    <CreateBtn variant='contained' color='success' onClick={clickHandler}>
      {title}
    </CreateBtn>
  );
};

export default CreateButton;