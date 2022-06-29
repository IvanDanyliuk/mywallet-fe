import React from 'react';
import { useTranslation } from 'react-i18next';
import { ITextMessage } from '../../redux/general';
import { BottomText, MessageContainer, TopText } from './styles';


const TextMessage: React.FC<ITextMessage> = ({ type }) => {
  const { t } = useTranslation(['dashboard']);

  return (
    <MessageContainer>
      <TopText variant='inherit'>
        {
          type === 'incomes' ? 
            t('topIncomesMessage') : 
            t('topExpensesMessage')  
          }
      </TopText>
      <BottomText variant='inherit'>
        {
          type === 'incomes' ? 
            t('bottomIncomesMessage') : 
            t('bottomExpensesMessage')
        }
      </BottomText>
    </MessageContainer>
  );
}

export default TextMessage;