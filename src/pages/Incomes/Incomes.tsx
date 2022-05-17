import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import CreateBtn from '../../components/CreateButton/CreateButton';
import { Heading, MainContainer } from './styles';
import { PageTitle } from '../../layouts/styles';
import CreateIncomeFormModal from '../../components/Modals/CreateIncomeFormModal';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { IState } from '../../types/types';

const Incomes: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const incomes = useSelector((state: IState) => state.incomes.incomes);
  
  const columns = [
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 100
    },
    {
      field: 'source',
      headerName: 'Source',
      width: 300,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      type: 'number',
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 300,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      editable: true,
      sortable: false,
    },
  ];

  const rows = incomes.map((income: any) => ({ ...income, id: income._id }));

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
        <DataGrid columns={columns} rows={rows} pageSize={10} rowsPerPageOptions={[10]} />
      </MainContainer>
    </>
  );
};

export default Incomes;