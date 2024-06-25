import React, { useEffect } from 'react'
import './CSS/Mainpage.css'
import indiaImg from './Images/india.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import indigoImg from './Images/Indigo.png'
import airIndiaImg from './Images/Air India.png'
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';

function Mainpage() {

    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguageContext();

    const nextToSelect = (event) => {
        event.preventDefault();
        navigate('/select', { state: formData });
    }

    const [formData, setFormData] = useState({
        from: "HYD",
        to: "GAU",
        depart: '',
        adult: 1,
        children: 0,
        infant: 0,
        classs: 'Economy',
        stops: "0"
    });


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [open, setOpen] = useState("book")
    let content

    const [existingPassword, setExistingPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [future, setFuture] = useState([])
    const [past, setPast] = useState([])

    const getFutureTrips = async () => {
        const loggedInUserEmail = JSON.parse(localStorage.getItem('loggedInUserData')).email;

        await fetch(`http://localhost:4000/getFutureTrips/${loggedInUserEmail}`, {
            method: 'GET',
            headers: {
              'auth_token': `${localStorage.getItem('auth_token')}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setFuture(data)
        })
    }

    const getPastTrips = async () => {
        const loggedInUserEmail = JSON.parse(localStorage.getItem('loggedInUserData')).email;

        await fetch(`http://localhost:4000/getPastTrips/${loggedInUserEmail}`, {
            method: 'GET',
            headers: {
              'auth_token': `${localStorage.getItem('auth_token')}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPast(data)
        })
    }

    useEffect(() => {
        getFutureTrips()
        getPastTrips()
    },[open])

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const loggedInUserEmail = JSON.parse(localStorage.getItem('loggedInUserData')).email;

        const res = await fetch(`http://localhost:4000/changePassword/${loggedInUserEmail}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth_token': localStorage.getItem('auth_token')
        },
        body: JSON.stringify({ existingPassword, newPassword })
        });

        const data = await res.json();
        alert(data.message);
        setExistingPassword("")
        setNewPassword("")

        if(data.message === "Password changed successfully") 
        {
            navigate('/main');
        }
    };

    if(open === "book")
    {
        content = (
            <div className="right">
                <form action="">
                    <div className="fromto">
                        <label for="from">{t('from')}:</label>
                        <select name="from" className="from" onChange={handleChange}>
                            <option value="HYD">HYD, Rajiv Gandhi International Airport</option>
                            <option value="GAU">GAU, Lokpriya Gopinath Bordoloi Inter</option>
                            <option value="DEL">DEL, Indira Gandhi International Airport I</option>
                        </select>

                        <label for="to">{t('to')}:</label>
                        <select name="to" className="to" onChange={handleChange}>
                            <option value="HYD">HYD, Rajiv Gandhi International Airport</option>
                            <option value="GAU">GAU, Lokpriya Gopinath Bordoloi International Airport</option>
                            <option value="DEL">DEL, Indira Gandhi International Airport </option>
                        </select>
                    </div>
                    
                    <label for="depart">{t('depart')}:</label>
                    <input type="date" name="depart" className='depart' onChange={handleChange}></input>

                    <div className="count">
                        <label for="adult">{t('adult')}(12y +):</label>
                        <input type="number" name="adult" className='adult' min="1" max="12" onChange={handleChange}></input>

                        <label for="children">{t('child')}(2y - 12y ):</label>
                        <input type="number" name="children" className='children' min="0" max="8" onChange={handleChange}></input>

                        <label for="infant">{t('infant')}(below 2y):</label>
                        <input type="number" name="infant" className='infant' min="0" max="4" onChange={handleChange}></input>
                    </div>
                    
                    <label for="classs" className='classss'>{t('travel class')}:</label>
                    <select name="classs" className="classs" onChange={handleChange}>
                        <option value="economy">Economy</option>
                        <option value="premium economy">Premium Economy</option>
                        <option value="business">Business</option>
                    </select>

                    <label for="stops" className='classss'>{t('stops')}:</label>
                    <select name="stops" className="classs" onChange={handleChange}>
                        <option value="0">Non-stop</option>
                        <option value="1">1 {t('stop')}</option>
                        <option value="2">2 {t('stop')}</option>
                        <option value="3">3 {t('stop')}</option>
                    </select>

                    <button className='search' onClick={(event) => nextToSelect(event)}>Search</button>
                </form>
            </div>
        )
    }
    else if(open === "personal")
    {
        const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'));
        content = (
            <div className='personalblock'>
                <div className="details">
                    <div className="details-row">
                        <div className="details-label">{t('fullname')}:</div>
                        <div className="details-value">{loggedInUserData.fullName}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-label">{t('email')}:</div>
                        <div className="details-value">{loggedInUserData.email}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-label">{t('mobileNo')}:</div>
                        <div className="details-value">{loggedInUserData.contact}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-label">{t('city')}:</div>
                        <div className="details-value">{loggedInUserData.city}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-label">{t('country')}:</div>
                        <div className="details-value">{loggedInUserData.country}</div>
                    </div>
                </div>

                <div className="change-password-container">
                    <h2>{t('change')}</h2>
                    <form className="change-password-form">
                        <label>{t('existing')}:
                            <input type="password" value={existingPassword} className='existpass' onChange={(e) => setExistingPassword(e.target.value)} required/>
                        </label>
                        <label> {t('new')}:
                            <input type="password" value={newPassword} className='newpass' onChange={(e) => setNewPassword(e.target.value)} required />
                        </label>
                        <button onClick={handleChangePassword} className="change-password-button">{t('changepass')}</button>
                    </form>
                </div>
            </div>
        );
    }
    else if (open === "future") {
        content = (
            <div className="futurebook">
                <h2>{t('upcoming')}</h2>
                <div className="trip-cards">
                    {future.map((trip, index) => (
                        <div key={index} className="trip-card">
                            <div className="imagetrip">
                                <img src={trip.flightName === "Indigo" ? indigoImg: airIndiaImg} alt="" />
                                <div className="trip-card-header">
                                    <h3>{trip.flightName}</h3>
                                    <p>{trip.date} at {trip.time}</p>
                                </div>
                            </div>
                            
                            <div className="trip-card-body">
                                <p><strong>Flight ID:</strong> {trip.flightid}</p>
                                <p><strong>Trip ID:</strong> {trip.tripid}</p>
                                <p><strong>From:</strong> {trip.from}</p>
                                <p><strong>To:</strong> {trip.to}</p>
                                <p><strong>Class:</strong> {trip.class[0]}</p>
                                <p><strong>Journey Time:</strong> {trip.journeyTime}</p>
                                <p><strong>Total Amount:</strong> ₹{trip.totalAmount}</p>
                                <p><strong>Stops:</strong> {trip.stops}</p>
                                {trip.stops > 0 && (
                                    <>
                                        <p><strong>Stop Locations:</strong> {trip.stopLocations.join(", ")}</p>
                                        <p><strong>Layover Times:</strong> {trip.layoverTime.join(", ")}</p>
                                    </>
                                )}
                                <p><strong>Seats:</strong> {trip.seats.join(", ")}</p>
                                <h4>Non-Infant Passengers</h4>
                                {trip.nonInfantPassengers.map((passenger, idx) => (
                                    <div key={idx} className="passenger-details">
                                        <p><strong>Name:</strong> {passenger.fullName}</p>
                                        <p><strong>Aadhaar:</strong> {passenger.aadhaar}</p>
                                        <p><strong>Gender:</strong> {passenger.gender}</p>
                                    </div>
                                ))}
                                {trip.infantPassengers.length > 0 && (
                                    <>
                                        <h4>Infant Passengers</h4>
                                        {trip.infantPassengers.map((passenger, idx) => (
                                            <div key={idx} className="passenger-details">
                                                <p><strong>Name:</strong> {passenger.fullName}</p>
                                                <p><strong>Gender:</strong> {passenger.gender}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    else{
        content = (
            <div className="futurebook">
                <h2>{t('past')}</h2>
                <div className="trip-cards">
                    {past.map((trip, index) => (
                        <div key={index} className="trip-card">
                            <div className="imagetrip">
                                <img src={trip.flightName === "Indigo" ? indigoImg: airIndiaImg} alt="" />
                                <div className="trip-card-header">
                                    <h3>{trip.flightName}</h3>
                                    <p>{trip.date} at {trip.time}</p>
                                </div>
                            </div>
                            
                            <div className="trip-card-body">
                                <p><strong>Flight ID:</strong> {trip.flightid}</p>
                                <p><strong>Trip ID:</strong> {trip.tripid}</p>
                                <p><strong>From:</strong> {trip.from}</p>
                                <p><strong>To:</strong> {trip.to}</p>
                                <p><strong>Class:</strong> {trip.class[0]}</p>
                                <p><strong>Journey Time:</strong> {trip.journeyTime}</p>
                                <p><strong>Total Amount:</strong> ₹{trip.totalAmount}</p>
                                <p><strong>Stops:</strong> {trip.stops}</p>
                                {trip.stops > 0 && (
                                    <>
                                        <p><strong>Stop Locations:</strong> {trip.stopLocations.join(", ")}</p>
                                        <p><strong>Layover Times:</strong> {trip.layoverTime.join(", ")}</p>
                                    </>
                                )}
                                <p><strong>Seats:</strong> {trip.seats.join(", ")}</p>
                                <h4>Non-Infant Passengers</h4>
                                {trip.nonInfantPassengers.map((passenger, idx) => (
                                    <div key={idx} className="passenger-details">
                                        <p><strong>Name:</strong> {passenger.fullName}</p>
                                        <p><strong>Aadhaar:</strong> {passenger.aadhaar}</p>
                                        <p><strong>Gender:</strong> {passenger.gender}</p>
                                    </div>
                                ))}
                                {trip.infantPassengers.length > 0 && (
                                    <>
                                        <h4>Infant Passengers</h4>
                                        {trip.infantPassengers.map((passenger, idx) => (
                                            <div key={idx} className="passenger-details">
                                                <p><strong>Name:</strong> {passenger.fullName}</p>
                                                <p><strong>Gender:</strong> {passenger.gender}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    


  return (
    <div className='mainpage'>
        <div className="nav">
            <img src={indiaImg} alt="" className='homeindia'/>
            <p className="name">{t('hello')}, {JSON.parse(localStorage.getItem('loggedInUserData')).fullName}</p>
            <button className="logout" onClick={() => {localStorage.removeItem('auth_token');window.location.replace('/')}}>{t('logout')}</button>
        </div>
        <div className="main">
            <div className="left">
                <div className="book" onClick={() => setOpen("book")}>{t('bookaflight')}</div>
                <div className="future" onClick={() => setOpen("future")}>{t('upcoming')}</div>
                <div className="past" onClick={() => setOpen("past")}>{t('past')}</div>
                <div className="personal" onClick={() => setOpen("personal")}>{t('personal info')}</div>
            </div>
            {content}
        </div>
    </div>
  )
}

export default Mainpage