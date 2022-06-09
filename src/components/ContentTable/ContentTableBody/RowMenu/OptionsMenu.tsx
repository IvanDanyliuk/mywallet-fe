import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  Option, 
  OptionIcon, 
  Options, 
  OptionsButton, 
  OptionsMenuContainer 
} from './styles';
import { useTranslation } from 'react-i18next';

export enum OptionsMenuType {
  Content = 'content',
  Reports = 'reports'
};

interface IOptionsMenu {
  id: string;
  type: OptionsMenuType;
  onOpen?: (id: any) => void;
  onEdit?: (id: any) => void;
  onDelete: (id: any) => void;
};

const OptionsMenu: React.FC<IOptionsMenu> = ({ id, type, onOpen, onEdit, onDelete }) => {
  const { t } = useTranslation(['contentTable']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <OptionsMenuContainer>
      <OptionsButton 
        id='row-button'
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        aria-controls={open ? 'row-menu' : undefined}
        value={id} 
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </OptionsButton>
      <Options 
        id='row-menu'
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleMenuClose}
      >
        {type === OptionsMenuType.Content && (
          <Option onClick={onEdit}>
            <OptionIcon>
              <EditIcon />&nbsp;{t('btnEdit')}
            </OptionIcon>
          </Option>
        )}
        {type === OptionsMenuType.Reports && (
          <Option onClick={onOpen}>
            <OptionIcon>
              <FolderOpenIcon />&nbsp;{t('btnOpen')}
            </OptionIcon>
          </Option>
        )}
        <Option>
          <OptionIcon onClick={onDelete}>
            <DeleteIcon />&nbsp;{t('btnDelete')}
          </OptionIcon>
        </Option>
      </Options>
    </OptionsMenuContainer>
  );
};

export default OptionsMenu;