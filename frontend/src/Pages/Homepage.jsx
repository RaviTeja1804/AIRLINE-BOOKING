import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';
import indiaImg from './Images/india.png';
import supportImg from './Images/support.png';
import languageImg from './Images/language.svg';
import skyGif from './Images/sky.gif';
import './CSS/Homepage.css';

function Homepage() {

    const { t } = useTranslation();
  const { language, changeLanguage } = useLanguageContext();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const selectLanguage = (lng) => {
    changeLanguage(lng);
    setShowLanguageDropdown(false);
  };

  const goToLogin = () => {
    window.location.replace('/login');
  };

  const support = () => {
    window.alert('In case of any issues, please use:\n\nContact: 9131313131\nEmail: flyWithUs123@gmail.com');
}

  const goToSignUp = () => {
    window.location.replace('/signup');
  };

  return (
    <div className='homepage'>
        <div className="navbar">
            <div className="flag">
                <img src={indiaImg} alt="india" className='flagImg'/>
            </div>

            <div className="extras">
                <div className="supportgrp">
                    <img src={supportImg} className='supportImg' alt="" />
                    <button className='support' onClick={support}>{t('support')}</button>
                </div>

                <div className="langgrp">
                    <img src={languageImg} className='supportImg' alt="" />
                    <button className='lang' onClick={toggleLanguageDropdown}>{t('languages')}</button>
                    {showLanguageDropdown && (
                        <ul className='language-dropdown'>
                            <li
                                className={language === 'Telugu' ? 'selected' : ''}
                                onClick={() => selectLanguage('Telugu')}
                            >
                                Telugu
                            </li>
                            <li
                                className={language === 'Hindi' ? 'selected' : ''}
                                onClick={() => selectLanguage('Hindi')}
                            >
                                Hindi
                            </li>
                            <li
                                className={language === 'English' ? 'selected' : ''}
                                onClick={() => selectLanguage('English')}
                            >
                                English
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div className="sign">
                <button className='signin' onClick={() => goToLogin()}>{t('login')}</button>
                <button className='signup' onClick={() => goToSignUp()}>{t('signup')}</button>
            </div>
        </div>

        <div className='header'>
            <p>{t('welcome1')}<br />{t('welcome2')}</p>
        </div>

        <div className='picture'>
            <img src={skyGif} alt="" className='movingsky'/>
        </div>
    </div>
  )
}

export default Homepage