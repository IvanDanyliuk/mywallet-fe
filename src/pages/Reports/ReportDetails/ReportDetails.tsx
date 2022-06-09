import { CircularProgress } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StructureChart from '../../../components/Charts/StructureChart';
import { getCurrencyIcon } from '../../../helpers/helpers';
import { getReport } from '../../../redux/reports/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import { 
  Amount,
  Comment,
  Currency,
  DataContainer, 
  DataList, 
  DataListItem, 
  Diagrams, 
  GoBackButton, 
  Name, 
  ReportDetailsContainer, 
  ReportHeader, 
  ReportInfo, 
  ReportPeriod, 
  ReportSection, 
  ReportTitle, 
  SectionContent, 
  SectionTitle, 
  TotalData,
  TotalItem
} from './styles';

const ReportDetails: React.FC = () => {
  const { t } = useTranslation(['reports']);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatchType>();

  const { openedReport } = useSelector((state: any) => state.reports);
  const { currency } = useSelector((state: any) => state.user.user);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getReport(id));
  }, [id]);

  useEffect(() => {
    if(openedReport) {
      const income = openedReport.data.incomes.map((income: any) => income.amount).reduce((a: any, c: any) => a + c, 0);
      const expenses = openedReport.data.expenses.map((expense: any) => expense.amount).reduce((a: any, c: any) => a + c, 0);
      setTotalIncome(income);
      setTotalExpenses(expenses);
    }
  }, [openedReport]);

  return (
    <>
      {!openedReport ? (
        <CircularProgress />
      ) : (
        <ReportDetailsContainer>
          <ReportHeader>
            <ReportInfo>
              <ReportTitle variant='inherit'>{openedReport.heading}</ReportTitle>
              <ReportPeriod variant='inherit'>
                {`${moment(openedReport.period.from).format('MMM DD, YYYY')} - ${moment(openedReport.period.to).format('MMM DD, YYYY')}`}
              </ReportPeriod>
            </ReportInfo>
            <GoBackButton variant='contained' onClick={goBack}>{t('goBackBtn')}</GoBackButton>
          </ReportHeader>
          <DataContainer>
            <ReportSection elevation={4}>
              <SectionTitle variant='inherit'>{t('sectionIncomes')}</SectionTitle>
              <SectionContent>
                <DataList>
                  {
                    openedReport.data.incomes.map((income: any) => (
                      <DataListItem>{income.source} {income.amount}</DataListItem>
                    ))
                  }
                </DataList>
                <Diagrams>
                  <StructureChart data={openedReport.data.incomes} dataKey={'amount'} nameKey={'source'} />
                </Diagrams>
              </SectionContent>
            </ReportSection>
            <ReportSection elevation={4}>
              <SectionTitle variant='inherit'>{t('sectionExpenses')}</SectionTitle>
              <SectionContent>
                <DataList>
                  {
                    openedReport.data.expenses.map((expense: any) => (
                      <DataListItem>{expense.source} {expense.amount}</DataListItem>
                    ))
                  }
                </DataList>
                <Diagrams>
                  <StructureChart data={openedReport.data.expenses} dataKey={'amount'} nameKey={'source'} />
                </Diagrams>
              </SectionContent>
            </ReportSection>
            <ReportSection>
              <SectionContent>
                <Comment variant='inherit'>
                  Comment: {openedReport.comment}
                </Comment>
                <TotalData>
                  <TotalItem>
                    <Name variant='inherit'>{t('totalIncome')}:&nbsp;</Name>
                    <Currency variant='inherit'>{getCurrencyIcon(currency)}</Currency>
                    <Amount variant='inherit'>{totalIncome}</Amount>
                  </TotalItem>
                  <TotalItem>
                    <Name variant='inherit'>{t('totalExpenses')}:&nbsp;</Name>
                    <Currency variant='inherit'>{getCurrencyIcon(currency)}</Currency>
                    <Amount variant='inherit'>{totalExpenses}</Amount>
                  </TotalItem>
                </TotalData>
              </SectionContent>
            </ReportSection>
          </DataContainer>
        </ReportDetailsContainer>
      )}
    </>
  );
};

export default ReportDetails;