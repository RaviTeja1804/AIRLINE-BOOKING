import React from 'react';
import './CSS/Loginpage.css';
import loginFlight from './Images/flightimg.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';

function Loginpage() {

    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguageContext();

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }

    const [formDataForLogin, setFormDataForLogin] = useState({
        email: "",
        password: ""
    })

    const changeHandler1 = (e) => {
        setFormDataForLogin({...formDataForLogin, [e.target.name]: e.target.value})
    }

    const login = async(req, res) => {
        let empty = 0
        for(const key in formDataForLogin) {
            if (!formDataForLogin[key]) {
                empty++;
            }
        }
        if(empty > 0)
        {
            alert("Input fields must not be empty")
            return
        }
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type':'application/json'
            },
            body: JSON.stringify(formDataForLogin)
        })
        .then((response) => response.json())
        .then((data) => responseData = data)

        if(responseData.success)
        {
            localStorage.setItem('auth_token', responseData.token)
            localStorage.setItem('loggedInUserData', JSON.stringify(responseData.user))
            navigate('/main')
        }
        else
        {
            alert(responseData.errors)
        }
    }

  return (
    <div className='loginpage-container'>
        <div className='loginpage'>
            <div className="login">{t('login')}</div>
            <hr />
            <div className="logg">
                <img src={loginFlight} alt="" className='loginFlight'/>
                <div className='signto'>{t('login to Enter')}</div>
                <form>
                    <input type="email" name='email' className='email' value={formDataForLogin.email} onChange={changeHandler1} placeholder={t('email')}/>
                    <input type="password" name='password' className='password' value={formDataForLogin.password} onChange={changeHandler1}  placeholder={t('password')}/>
                    <button type="button" onClick={() => login()}>{t('login')}</button>
                </form>
                <button onClick={() => goToHome()}>Back</button>
                <div className="dont">
                    <p>{t('dont have an account yet')}? </p>
                    <Link to='/signup'>{t('signup')}!</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Loginpage;
