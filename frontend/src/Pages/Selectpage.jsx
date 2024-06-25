import React, { useEffect, useState } from 'react';
import './CSS/Selectpage.css';
import { useLocation } from 'react-router-dom';
import indigoImg from './Images/Indigo.png';
import airindiaImg from './Images/Air India.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';

function Selectpage() {
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguageContext();
    
    const nextToSeat = (tripid) => {
        navigate('/seat', { state: { formData, tripid } });
    };

    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state;

    const [trips, setTrips] = useState([]);
    const [matchingFlights, setMatchingFlights] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            fetch('http://localhost:4000/trips', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Fetched trips:', data);  // Debug: Log fetched trips
                    setTrips(data);
                });
        }
    }, []);

    useEffect(() => {
        console.log('Form data:', formData);  // Debug: Log form data
        updateMatchingFlights();
    }, [formData, trips]);

    const totalPassengers = parseInt(formData.adult) + parseInt(formData.children);

    const updateMatchingFlights = () => {
        const filteredFlights = trips.filter(flight => {
            const matchesFrom = flight.from === formData.from;
            const matchesTo = flight.to === formData.to;
            const matchesDate = flight.date.substring(0, 10) === formData.depart;
            const matchesClass = flight.class[0].toLowerCase() === formData.classs.toLowerCase();
            const matchesSeats = flight.seats >= totalPassengers;
            const matchesStops = flight.stops === parseInt(formData.stops);

            // console.log(`Comparing flight ${flight.flightid}:`);
            // console.log(`From: ${matchesFrom}, To: ${matchesTo}, Date: ${matchesDate}, Class: ${matchesClass}, Seats: ${matchesSeats}, Stops: ${matchesStops}`);
            // console.log(`FormData stops: ${parseInt(formData.stops)}, Flight stops: ${flight.stops}`);

            return matchesFrom && matchesTo && matchesDate && matchesClass && matchesSeats && matchesStops;
        });

        console.log('Filtered flights:', filteredFlights);  // Debug: Log filtered flights
        setMatchingFlights(filteredFlights);
    };

    return (
        <div className='selectflight'>
            <h2>{t('available flights')}</h2>
            {matchingFlights.length > 0 ? (
                <div className='biggerbox'>
                    {matchingFlights.map((flight, index) => (
                        <div className="bigbox" key={index}>
                            <div className="smallbox1">
                                <img src={flight.name === 'Indigo' ? indigoImg : airindiaImg} alt={flight.name} className='flight-logo' />
                                <p>{t('name')}: {flight.name}</p>
                                <p>{t('from')}: {flight.from}</p>
                                <p>{t('to')}: {flight.to}</p>
                            </div>
                            <div className='smallbox2'>
                                <p>{t('date')}: {flight.date.substring(0, 10)}</p>
                                <p>{t('class')}: {flight.class}</p>
                                <p>{t('journey time')}: {flight.journeyTime}</p>
                                {flight.stops > 0 && (
                                    <div>
                                        <p>{t('stops')}: {flight.stops}</p>
                                        <p>Stop Locations: {flight.stopLocations.join(', ')}</p>
                                        <p>Layover Time: {flight.layoverTime.join(', ')}</p>
                                    </div>
                                )}
                                <p>{t('price')} ({t('adult')}): ₹{flight.priceAdult}</p>
                                <p>{t('price')} ({t('child')}): ₹{flight.priceChild}</p>
                            </div>
                            <div className="buttonbox">
                                <button onClick={() => nextToSeat(flight.tripid)}>Proceed</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='no-flights'>{t('no flights')}</p>
            )}
        </div>
    );
}

export default Selectpage;
