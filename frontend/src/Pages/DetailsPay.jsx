import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./CSS/DetailsPay.css";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../context/LanguageContext';

function DetailsPay() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguageContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { formData = {}, totalAmount = 0, selectedSeats = [], flight = {} } = location.state || {};

  const totalPassengers = parseInt(formData.adult) + parseInt(formData.children);
  const numInfants = parseInt(formData.infant);

  useEffect(() => {
    console.log(flight)
  },[formData])

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: totalPassengers }, () => ({ fullName: "", aadhaar: "", gender: "" }))
  );
  const [infantDetails, setInfantDetails] = useState(
    Array.from({ length: numInfants }, () => ({ fullName: "", gender: "" }))
  );

  const handlePassengerChange = (index, event) => {
    const { name, value } = event.target;
    setPassengerDetails((prevDetails) =>
      prevDetails.map((detail, i) => (i === index ? { ...detail, [name]: value } : detail))
    );
  };

  const handleInfantChange = (index, event) => {
    const { name, value } = event.target;
    setInfantDetails((prevDetails) =>
      prevDetails.map((detail, i) => (i === index ? { ...detail, [name]: value } : detail))
    );
  };
  
    const addTrip = async (event) => {
      event.preventDefault()
      const loggedInUserEmail = (JSON.parse(localStorage.getItem('loggedInUserData'))).email;
      const formDataToAddTrip = {
        from: flight.from,
        to: flight.to,
        date: flight.date.substring(0,10),
        flightid: flight.flightid,
        tripid: flight.tripid,
        flightName: flight.name,
        time: flight.time,
        class: flight.class[0],
        journeyTime: flight.journeyTime,
        priceAdult: flight.priceAdult,
        priceChild: flight.priceChild,
        stops: flight.stops,
        stopLocations: flight.stopLocations,
        layoverTime:flight.layoverTime,
        selectedSeats: selectedSeats,
        nonInfantPassengers: passengerDetails,
        infantPassengers: infantDetails,
        totalAmount: totalAmount
      };
      console.log(formDataToAddTrip)
        const res = await fetch(`http://localhost:4000/addTrip/${loggedInUserEmail}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formDataToAddTrip)
        })
        const data = await res.json(); 
        alert(data.message);
        navigate('/main')
    }

    return (
      <div className="fulldetails">
        <h2>{t('payment details')}</h2>
        <p>{t('passengers')}: {totalPassengers}</p>
        <p>{t('total amount')}: ₹{totalAmount}</p>
        <form className="passenger-details-form">
          {Array.from({ length: totalPassengers }).map((_, index) => (
            <div key={index} className="passenger-details">
              <h3>{t('passenger')} {index + 1}</h3>
              <label>
              {t('fullname')}:
                <input type="text" name="fullName" value={passengerDetails[index].fullName} onChange={(e) => handlePassengerChange(index, e)} required/>
              </label>
              <label>
              {t('aadhaar')}:
                {index < numInfants ? (
                  <input type="text" name="aadhaar" value={passengerDetails[index].aadhaar} onChange={(e) => handlePassengerChange(index, e)}/>
                ) : (
                  <input type="text" name="aadhaar" value={passengerDetails[index].aadhaar} onChange={(e) => handlePassengerChange(index, e)} required/>
                )}
              </label>
              <label>
              {t('gender')}:
                <select name="gender" value={passengerDetails[index].gender} onChange={(e) => handlePassengerChange(index, e)} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
          ))}
          {numInfants > 0 && (
            <>
              <h3>Infants</h3>
              {Array.from({ length: numInfants }).map((_, index) => (
                <div key={index} className="passenger-details">
                  <h4>Infant {index + 1}</h4>
                  <label>
                    Full Name:
                    <input name="fullName" value={infantDetails[index].fullName} type="text" onChange={(e) => handleInfantChange(index, e)} required />
                  </label>
                  <label>
                    Gender:
                    <select name="gender" value={infantDetails[index].gender} onChange={(e) => handleInfantChange(index, e)} required>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
              ))}
            </>
          )}
          <button className="submit-button" onClick={addTrip}>
            Proceed to Payment
          </button>
        </form>
      </div>
    );
  }
  
  export default DetailsPay;