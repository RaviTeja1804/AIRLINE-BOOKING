import React, { useState, useEffect } from 'react';
import './CSS/Seatpage.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';

function Seatpage() {

    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguageContext();

    const nextToDetailsPay = (totalAmount) => {
        navigate('/detailsPay', { state: { formData, totalAmount, selectedSeats, flight } });
    };

    const [flight, setFlight] = useState({})

    const navigate = useNavigate();

    const location = useLocation();
    const {formData, tripid} = location.state;
    const totalPassengers = parseInt(formData.adult) + parseInt(formData.children);

    const getTrip = async () => {
        if(localStorage.getItem('auth_token'))
          {
            await fetch(`http://localhost:4000/tripFromId/${tripid}`, {
              method: 'GET',
              headers: {
                'auth_token': `${localStorage.getItem('auth_token')}`
              }
            })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              setFlight(data)
            })
          }
      }

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const calculateTotalAmount = () => {
        let baseAmount = formData.adult * flight.priceAdult + formData.children * flight.priceChild;
        let extraAmount = selectedSeats.reduce((total, seat) => {
            if (seat.endsWith('A') || seat.endsWith('F')) {
                return total + 200; 
            } else if (seat.endsWith('C') || seat.endsWith('D')) {
                return total + 100; 
            }
            return total;
        }, 0);
        setTotalAmount(baseAmount + extraAmount);
    };

    useEffect(() => {
        getTrip();
    }, [tripid]);

    useEffect(() => {
        if (Object.keys(flight).length > 0) {
            calculateTotalAmount();
        }
    }, [selectedSeats, flight]);

    const isSeatBooked = (row, seat) => {
        
        return flight.availableSeats.find(s => s.row === row && s.booked.includes(seat));
    };

    let content

    if(Object.keys(flight).length === 0)
    {
        content = (
            <h1>Loading</h1>
        )
    }
    else
    {
        content = (
            <div className='fullseatpage'>
            <div className='seatpage'>
            <div className="info">
                <h2>{flight.name} - {t('seat selection')}</h2>
                <p>{t('date')}: {flight.date.substring(0,10)}</p>
                <p>{t('from')}: {flight.from}</p>
                <p>{t('to')}: {flight.to}</p>
                <p>{t('class')}: {flight.class}</p>
                <p>{t('journey time')}: {flight.journeyTime}</p>
                <p>{t('price')} ({t('adult')}): ₹{flight.priceAdult}</p>
                <p>{t('price')} ({t('child')}): ₹{flight.priceChild}</p>
                <p className='warn'>{t('window')} (A,F) is ₹200 and {t('aisle')} (C,D) is ₹100</p>
            </div>

            <div className="airplane">
                {flight.availableSeats.map(row => (
                    <div key={row.row} className="eachrow">
                        {row.seats.map(seat => (
                            <div key={seat} className={`eachseat ${isSeatBooked(row.row, seat) ? 'booked' : 'notbooked'} ${selectedSeats.includes(`${row.row}${seat}`) ? 'selected' : ''}`} onClick={() => toggleSeatSelection(row.row, seat)} >
                                {row.row}{seat}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        <div className="price">
            <div className="totalamount">{t('amount')}: ₹{totalAmount}</div>
            <button className='propay' onClick={() => nextToDetailsPay(totalAmount)}>Proceed to payment</button>
        </div>
        </div>

        )
    }

    const toggleSeatSelection = (row, seat) => {
        if(flight.availableSeats.find(s => s.row === row && s.booked.includes(seat)))
        {
            alert("That seat is already booked")
            return
        }
        const selected = `${row}${seat}`;
        if (selectedSeats.includes(selected)) {
            setSelectedSeats(selectedSeats.filter(s => s !== selected));
        } else {
            if (selectedSeats.length < totalPassengers) 
            {
                setSelectedSeats([...selectedSeats, selected]);
            } 
            else 
            {
                alert(`You are booking only for ${totalPassengers} members.`);
            }
        }
    };

    

    return (
        content
    );
}

export default Seatpage;
