import React from 'react'
import ContentTableBody from './ContentTableBody/ContentTableBody'
import ContentTableHeader from './ContentTableHeader/ContentTableHeader'
import { ContentTableContainer, PaperContainer } from './styles'

const ContentTable = () => {
  return (
    <PaperContainer>
      <ContentTableContainer>
        <ContentTableHeader type='incomes' />
        <ContentTableBody />
      </ContentTableContainer>
    </PaperContainer>
  );
};

export default ContentTable;