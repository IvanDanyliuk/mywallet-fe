import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ContentTable from '../../components/ContentTable/ContentTable';
import CreateButton from '../../components/CreateButton/CreateButton';
import CreateFormModal from '../../components/Modals/CreateFormModal';
import { MainContainer } from '../../components/Navigation/styles';
import { getExpenses } from '../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { PageTitle } from '../../layouts/styles';
import { Heading } from './styles';

const Expenses: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateExpenseHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <>
      <CreateFormModal 
        type={'expenses'} 
        open={isModalOpen} 
        onClose={openCreateExpenseHandler} 
      />
      <Heading>
        <PageTitle variant='inherit'>Expenses</PageTitle>
        <CreateButton 
          title='New Expense' 
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