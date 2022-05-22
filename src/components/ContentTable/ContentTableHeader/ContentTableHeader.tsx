import React from 'react';
import HeaderCell from './HeaderCell/HeaderCell';
import { HeaderContainer, HeaderRow } from './styles';

interface IContentTableHeader {
  columns: {
    sortKey: string;
    label: string;
    isSortable: boolean;
  }[]
};

const ContentTableHeader: React.FC<IContentTableHeader> = ({ columns }) => {
  return (
    <HeaderContainer>
      <HeaderRow>
        {
          columns.map(column => (
            <HeaderCell 
              key={column.sortKey}
              type={column.sortKey}
              sortKey={column.sortKey}
              label={column.label}
              isSortable={column.isSortable}
            />
          ))
        }
      </HeaderRow>
    </HeaderContainer>
  );
};

export default ContentTableHeader;