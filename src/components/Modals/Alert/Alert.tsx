import React from 'react';
import CloseIcon from '@mui/icons-material/Close'
import { IAlert } from '../../../redux/general';
import { AlertContainer, CollapseWrapper, AlertBody, AlertIcon } from './styles';


const Alert: React.FC<IAlert> = ({ isOpen, title, handler }) => {
  return (
    <AlertContainer>
      <CollapseWrapper in={isOpen}>
        <AlertBody
          severity='error'
          action={
            <AlertIcon
              aria-label='close'
              color='inherit'
              size='medium'
              onClick={handler}
            >
              <CloseIcon />
            </AlertIcon>
          }
        >
          {title}
        </AlertBody>
      </CollapseWrapper>
    </AlertContainer>
  );
};

export default Alert;