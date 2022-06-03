import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ContentTable from '../../components/ContentTable/ContentTable';
import CreateButton from '../../components/CreateButton/CreateButton';
import CreateFormModal from '../../components/Modals/CreateFormModal/CreateFormModal';
import { MainContainer } from '../../components/Navigation/styles';
import { getExpenses } from '../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { PageTitle } from '../../layouts/styles';
import { Heading } from './styles';
import { useTranslation } from 'react-i18next';

const Expenses: React.FC = () => {
  const { t } = useTranslation(['expenses']);
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //@ts-ignore
  const userId = JSON.parse(localStorage.getItem('profile')).result._id;

  const openCreateExpenseHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getExpenses(userId));
  }, [dispatch]);

  return (
    <>
      <CreateFormModal 
        type={'expenses'} 
        open={isModalOpen} 
        onClose={openCreateExpenseHandler} 
      />
      <Heading>
        <PageTitle variant='inherit'>{t('pageHeading')}</PageTitle>
        <CreateButton 
          title={t('createBtnTitle')} 
          clickHandler={openCreateExpenseHandler} 
        />
      </Heading>
      <MainContainer>
        <ContentTable type={'expenses'} />
      </MainContainer>
    </>
  );
};

export default Expenses;