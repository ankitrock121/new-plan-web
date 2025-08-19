import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingWidget = ({ place }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = () => {
    if (!startDate || !endDate) return;
    
    setIsCalculating(true);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const calculatedTotal = place.price * guests * diffDays;
    
    setTotalPrice(calculatedTotal);
    setIsCalculating(false);
  };

  const handleBookNow = () => {
    const bookingDetails = {
      placeId: place.id,
      placeName: place.name,
      startDate,
      endDate,
      guests,
      totalPrice
    };
    navigate('/checkout', { state: { bookingDetails } });
  };

  return (
    <div className="booking-widget">
      <h3>Book Your Trip</h3>
      <div className="price-per-night">
        <span className="price">${place.price}</span>
        <span className="label">per night</span>
      </div>
      
      <div className="booking-form">
        <div className="form-group">
          <label>Dates</label>
          <div className="date-range-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                if (endDate && date > endDate) setEndDate(null);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText="Check-in"
              className="date-input"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                calculateTotal();
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              placeholderText="Check-out"
              className="date-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Guests</label>
          <select
            value={guests}
            onChange={(e) => {
              setGuests(parseInt(e.target.value));
              if (startDate && endDate) calculateTotal();
            }}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
        
        {totalPrice > 0 && (
          <div className="price-summary">
            <div className="price-row">
              <span>${place.price} x {guests} guests x {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} nights</span>
              <span>${place.price * guests * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        )}
        
        <button 
          className="book-now-button"
          onClick={handleBookNow}
          disabled={!startDate || !endDate || isCalculating}
        >
          {isCalculating ? 'Calculating...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;