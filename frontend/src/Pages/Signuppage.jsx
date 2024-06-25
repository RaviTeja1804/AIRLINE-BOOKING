import React from 'react'
import './CSS/Signuppage.css'
import loginFlight from './Images/flightimg.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';

function Signuppage() {

    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguageContext();

    const goToHome = () => {
        window.location.replace('/')
    }

    const navigate = useNavigate()

    const [formDataForSignup, setFormDataForSignup] = useState({
        fullName:"",
        email:"",
        password:"",
        repassword:"",
        contact:"",
        city:"",
        country:""
    })

    const changeHandler2 = (e) => {
        setFormDataForSignup({...formDataForSignup, [e.target.name]: e.target.value})
    }

    const register = async(req, res) => {
        let empty = 0
        for(const key in formDataForSignup) {
            if (!formDataForSignup[key]) {
                empty++;
            }
        }
        if(empty > 0)
        {
            alert("Input fields must not be empty")
            return
        }
        if(formDataForSignup.password !== formDataForSignup.repassword)
        {
            alert("Password and Confirmation password are not matching")
            return
        }
        let responseData;
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type':'application/json'
            },
            body: JSON.stringify(formDataForSignup)
        })
        .then((response) => response.json())
        .then((data) => responseData = data)

        if(responseData.success)
        {
            alert("Successfully Registered, Login to Continue")
            setFormDataForSignup({
                fullName: "",
                gender: "",
                contact:"",
                email:"",
                password:"",
                repassword:""
            });
            navigate('/')
        }
        else
        {
            alert(responseData.errors)
        }
    }
    
  return (
    <div className='signup-container'>
        <div className='signupp'>
            <div className="login">{t('signup')}</div>
            <hr />
            <div className="logg">
                <img src={loginFlight} alt="" className='loginFlight'/>
                <div className='signto'>{t('setup personal info')}</div>
                <form action="">
                    <input type="text" name='fullName' className='Fullname' value={formDataForSignup.fullName} onChange={changeHandler2} placeholder={t('fullname')}/>
                    <input type="number" name='contact' className='MobileNo' value={formDataForSignup.contact} onChange={changeHandler2} placeholder={t('mobileNo')}/>
                    <input type="text" name='city' className='City' value={formDataForSignup.city} onChange={changeHandler2} placeholder={t('city')}/>
                    <input type="text" name='country' className='Country' value={formDataForSignup.country} onChange={changeHandler2} placeholder={t('country')}/>
                    <div className='signto2'>{t('add credentials')}</div>
                    <input type="email" name='email' className='EmailAddress' value={formDataForSignup.email} onChange={changeHandler2} placeholder={t('email')}/>
                    <input type="password" name='password' className='Password' value={formDataForSignup.password} onChange={changeHandler2} placeholder={t('password')}/>
                    <input type="password" name='repassword' className='ConfirmationPassword' value={formDataForSignup.repassword} onChange={changeHandler2} placeholder={t('confirm')}/>
                    <button type='button' onClick={() => register()}>{t('signup')}</button>
                </form>
                <button onClick={() => goToHome()}>Back</button>
            </div>
        </div>
    </div>
  )
}

export default Signuppage