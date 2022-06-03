import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';
import { setLanguage } from '../../../redux/user/asyncAction';
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

  const user = JSON.parse(localStorage.getItem('profile') || '');
  const [currentLanguage, setCurrentLanguage] = useState(user.result.language);

  const handleLanguageChange = (e: any) => {
    e.preventDefault();
    setCurrentLanguage(e.target.value);
  };

  useEffect(() => {
    if(user.result.language !== currentLanguage) {
      dispatch(setLanguage({ 
        id: user.result._id, 
        language: currentLanguage 
      }));
      localStorage.setItem(
        'profile', 
        JSON.stringify({ 
          token: user.token, 
          result: { ...user.result, language: currentLanguage } 
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