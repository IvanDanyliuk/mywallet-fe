import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateButton from '../../components/CreateButton/CreateButton';
import CreateFormModal from '../../components/Modals/CreateFormModal/CreateFormModal';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import ContentTable from '../../components/ContentTable/ContentTable';
import { Heading, MainContainer } from './styles';
import { PageTitle } from '../../layouts/styles';
import { useTranslation } from 'react-i18next';

export enum TableType {
  Incomes = 'incomes',
  Expenses = 'expenses'
};

export enum FormModalType {
  Incomes = 'incomes',
  Expenses = 'expenses'
};

const Incomes: React.FC = () => {
  const { t } = useTranslation(['incomes']);
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //@ts-ignore
  const userId = JSON.parse(localStorage.getItem('profile')).result._id;

  const openCreateIncomeHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getIncomes(userId));
  }, [dispatch]);

  return (
    <>
      <CreateFormModal 
        type={FormModalType.Incomes} 
        open={isModalOpen} 
        onClose={openCreateIncomeHandler} 
      />
      <Heading>
        <PageTitle variant='inherit'>{t('pageHeading')}</PageTitle>
        <CreateButton 
          title={t('createBtnTitle')} 
          clickHandler={openCreateIncomeHandler} 
        />
      </Heading>
      <MainContainer>
        <ContentTable type={TableType.Incomes} />
      </MainContainer>
    </>
  );
};

export default Incomes;