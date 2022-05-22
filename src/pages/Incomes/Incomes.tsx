import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateButton from '../../components/CreateButton/CreateButton';
import { Heading, MainContainer } from './styles';
import { PageTitle } from '../../layouts/styles';
import CreateFormModal from '../../components/Modals/CreateFormModal';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import ContentTable from '../../components/ContentTable/ContentTable';

export enum TableType {
  Incomes = 'incomes',
  Expenses = 'expenses'
};

export enum FormModalType {
  Incomes = 'incomes',
  Expenses = 'expenses'
};

const Incomes: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateIncomeHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getIncomes());
  }, [dispatch]);

  return (
    <>
      <CreateFormModal type={FormModalType.Incomes} open={isModalOpen} onClose={openCreateIncomeHandler} />
      <Heading>
        <PageTitle variant='inherit'>Incomes</PageTitle>
        <CreateButton title='New income' clickHandler={openCreateIncomeHandler} />
      </Heading>
      <MainContainer>
        <ContentTable type={TableType.Incomes} />
      </MainContainer>
    </>
  );
};

export default Incomes;