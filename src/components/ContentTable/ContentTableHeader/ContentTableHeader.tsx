import React from 'react';
import { IContentTableHeader } from '../../../redux/general';
import HeaderCell from './HeaderCell/HeaderCell';
import { HeaderContainer, HeaderRow } from './styles';


const ContentTableHeader: React.FC<IContentTableHeader> = ({ columns }) => {
  return (
    <HeaderContainer>
      <HeaderRow>
        {
          columns.map(({ sortKey, label, isSortable }) => (
            <HeaderCell 
              key={sortKey}
              type={sortKey}
              sortKey={sortKey}
              label={label}
              isSortable={isSortable}
            />
          ))
        }
      </HeaderRow>
    </HeaderContainer>
  );
};

export default ContentTableHeader;