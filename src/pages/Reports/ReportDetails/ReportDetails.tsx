import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import StructureChart from '../../../components/Charts/StructureChart';
import { getCurrencyIcon } from '../../../helpers/helpers';
import { getReport } from '../../../redux/reports/asyncActions';
import { selectReport } from '../../../redux/reports/selectors';
import { selectCurrency } from '../../../redux/user/selectors';
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

  const report = useSelector(selectReport);
  const currency = useSelector(selectCurrency);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getReport(id));
  }, [id]);

  useEffect(() => {
    if(report) {
      const income = report.data.incomes.map((income: any) => income.amount).reduce((a: any, c: any) => a + c, 0);
      const expenses = report.data.expenses.map((expense: any) => expense.amount).reduce((a: any, c: any) => a + c, 0);
      setTotalIncome(income);
      setTotalExpenses(expenses);
    }
  }, [report]);

  return (
    <>
      {!report ? (
        <CircularProgress />
      ) : (
        <ReportDetailsContainer>
          <ReportHeader>
            <ReportInfo>
              <ReportTitle variant='inherit'>{report.heading}</ReportTitle>
              <ReportPeriod variant='inherit'>
                {`${moment(report.period.from).format('MMM DD, YYYY')} - ${moment(report.period.to).format('MMM DD, YYYY')}`}
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
                    report.data.incomes.map((income: any) => (
                      <DataListItem>{income.source} {income.amount}</DataListItem>
                    ))
                  }
                </DataList>
                <Diagrams>
                  <StructureChart data={report.data.incomes} dataKey={'amount'} nameKey={'source'} />
                </Diagrams>
              </SectionContent>
            </ReportSection>
            <ReportSection elevation={4}>
              <SectionTitle variant='inherit'>{t('sectionExpenses')}</SectionTitle>
              <SectionContent>
                <DataList>
                  {
                    report.data.expenses.map((expense: any) => (
                      <DataListItem>{expense.source} {expense.amount}</DataListItem>
                    ))
                  }
                </DataList>
                <Diagrams>
                  <StructureChart data={report.data.expenses} dataKey={'amount'} nameKey={'source'} />
                </Diagrams>
              </SectionContent>
            </ReportSection>
            <ReportSection>
              <SectionContent>
                <Comment variant='inherit'>
                  Comment: {report.comment}
                </Comment>
                <TotalData>
                  <TotalItem>
                    <Name variant='inherit'>{t('totalIncome')}:&nbsp;</Name>
                    <Currency variant='inherit'>{getCurrencyIcon(currency!)}</Currency>
                    <Amount variant='inherit'>{totalIncome}</Amount>
                  </TotalItem>
                  <TotalItem>
                    <Name variant='inherit'>{t('totalExpenses')}:&nbsp;</Name>
                    <Currency variant='inherit'>{getCurrencyIcon(currency!)}</Currency>
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