import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatchType } from '../../../redux/store';
import { setLanguage } from '../../../redux/user/asyncAction';
import { selectUser } from '../../../redux/user/selectors';
import i18n from '../../../services/langConfig';
import { 
  Section, 
  LanguageItem, 
  LanguageSelect, 
  SectionTitle 
} from './styles';


const Language: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch<AppDispatchType>();

  const user = useSelector(selectUser);
  const [currentLanguage, setCurrentLanguage] = useState(user!.language);
  
  const token = JSON.parse(localStorage.getItem('profile') || '').token;

  const handleLanguageChange = (e: any) => {
    e.preventDefault();
    setCurrentLanguage(e.target.value);
  };

  useEffect(() => {
    if(user!.language !== currentLanguage) {
      dispatch(setLanguage({ 
        id: user!._id, 
        language: currentLanguage 
      }));
      localStorage.setItem(
        'profile', 
        JSON.stringify({ 
          token: token, 
          result: { ...user, language: currentLanguage } 
        })
      );
      localStorage.setItem('lang', currentLanguage);
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <Section>
      <SectionTitle variant='inherit'>{t('languageSectionTitle')}</SectionTitle>
      <LanguageSelect value={currentLanguage} onChange={handleLanguageChange}>
        <LanguageItem value={'en'}>{t('languageOptionEn')}</LanguageItem>
        <LanguageItem value={'ua'}>{t('languageOptionUa')}</LanguageItem>
      </LanguageSelect>
    </Section>
  );
};

export default Language;