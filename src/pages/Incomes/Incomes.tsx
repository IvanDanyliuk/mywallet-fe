import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateBtn from '../../components/CreateButton/CreateButton';
import { Heading, MainContainer } from './styles';
import { PageTitle } from '../../layouts/styles';
import CreateIncomeFormModal from '../../components/Modals/CreateIncomeFormModal';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import ContentTable from '../../components/ContentTable/ContentTable';

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
      <CreateIncomeFormModal open={isModalOpen} onClose={openCreateIncomeHandler} />
      <Heading>
        <PageTitle variant='inherit'>Incomes</PageTitle>
        <CreateBtn title='New income' clickHandler={openCreateIncomeHandler} />
      </Heading>
      <MainContainer>
        <ContentTable />
      </MainContainer>
    </>
  );
};

export default Incomes;