import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import './Booking.css';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const stationId = searchParams.get('stationId');
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!stationId) {
      navigate('/cafes');
      return;
    }
    
    // Fetch Station Details
    bookingService.getStationDetails(stationId)
      .then(data => {
        setStation(data);
      })
      .catch(err => {
        setError('Failed to load station details');
      });
  }, [stationId, navigate]);

  useEffect(() => {
    if (stationId && selectedDate) {
      setLoading(true);
      setSelectedSlot(null);
      bookingService.getAvailability(stationId, selectedDate)
        .then(data => {
          setSlots(data.slots || []);
        })
        .catch(err => {
          setError('Failed to load availability');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [stationId, selectedDate]);

  const handleSlotClick = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleConfirm = async () => {
    if (!selectedSlot || !station) return;
    
    setProcessing(true);
    try {
      await bookingService.createBooking({
        stationId: station.id,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime
      });
      navigate('/bookings/my');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
      setProcessing(false);
    }
  };

  if (error) return <div className="booking-page-container"><p style={{color: '#f87171', textAlign: 'center'}}>{error}</p></div>;
  if (!station) return <div className="booking-page-container"><p style={{textAlign: 'center'}}>Loading...</p></div>;

  return (
    <div className="booking-page-container">
      <div className="booking-content">
        <div className="booking-header">
          <h1>Complete Your Booking</h1>
          <p>Secure your spot and get ready to play.</p>
        </div>

        <div className="booking-card">
          <div className="booking-station-info">
            <div>
              <h2>{station.label}</h2>
              <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>{station.specs}</p>
            </div>
            <div className="booking-price">
              ₹{station.hourlyRate} / hour
            </div>
          </div>

          <div className="date-picker-group">
            <label>Select Date</label>
            <input 
              type="date" 
              className="date-input"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="slots-section">
            <h3>Available Time Slots</h3>
            {loading ? (
              <p style={{ color: '#a0aec0' }}>Loading slots...</p>
            ) : slots.length === 0 ? (
              <p style={{ color: '#f87171' }}>No slots available for this date.</p>
            ) : (
              <div className="slots-grid">
                {slots.map((slot, index) => {
                  const isSelected = selectedSlot?.startTime === slot.startTime;
                  return (
                    <button
                      key={index}
                      className={`slot-btn ${isSelected ? 'selected' : ''}`}
                      disabled={!slot.available}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot.startTime.substring(0, 5)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {selectedSlot && (
            <div className="booking-summary fade-in visible">
              <h4>Booking Summary</h4>
              <div className="summary-row">
                <span>Date</span>
                <span>{selectedDate}</span>
              </div>
              <div className="summary-row">
                <span>Time Slot</span>
                <span>{selectedSlot.startTime.substring(0,5)} - {selectedSlot.endTime.substring(0,5)}</span>
              </div>
              <div className="summary-total">
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent-cyan)' }}>₹{station.hourlyRate}</span>
              </div>
              
              <button 
                className="btn-confirm" 
                onClick={handleConfirm}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
