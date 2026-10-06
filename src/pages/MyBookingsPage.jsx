import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { HiCalendar, HiClock, HiMapPin } from 'react-icons/hi2';
import './Booking.css';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      // Sort: upcoming first (by date then time)
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.startTime);
        const dateB = new Date(b.date + 'T' + b.startTime);
        return dateB - dateA;
      });
      setBookings(sortedData);
    } catch (err) {
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await bookingService.cancelBooking(id);
      // Refresh list
      fetchBookings();
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  const getStatusBadge = (status, date, endTime) => {
    const isPast = new Date() > new Date(date + 'T' + endTime);
    
    if (status === 'CANCELLED') {
      return <span className="status-badge cancelled">Cancelled</span>;
    }
    if (isPast) {
      return <span className="status-badge completed">Completed</span>;
    }
    return <span className="status-badge confirmed">Confirmed</span>;
  };

  if (loading) return <div className="booking-page-container"><p style={{textAlign: 'center'}}>Loading...</p></div>;

  return (
    <div className="booking-page-container">
      <div className="my-bookings-container">
        <div className="booking-header" style={{ textAlign: 'left' }}>
          <h1>My Bookings</h1>
          <p>Manage your upcoming and past gaming sessions.</p>
        </div>

        {error && <p style={{ color: '#f87171' }}>{error}</p>}

        {bookings.length === 0 ? (
          <div className="booking-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
            <h3 style={{ marginBottom: '16px', color: '#a0aec0' }}>No bookings found</h3>
            <Link to="/cafes" className="btn btn-primary">Find a Café</Link>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map(booking => {
              const isPast = new Date() > new Date(booking.date + 'T' + booking.endTime);
              const isCancellable = booking.status === 'CONFIRMED' && !isPast;

              return (
                <div key={booking.id} className="booking-item">
                  <div className="booking-item-details">
                    <h3>{booking.cafeName}</h3>
                    <div className="booking-item-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <HiCalendar size={16} /> {booking.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <HiClock size={16} /> {booking.startTime.substring(0,5)} - {booking.endTime.substring(0,5)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <HiMapPin size={16} /> {booking.stationLabel}
                      </span>
                    </div>
                    {getStatusBadge(booking.status, booking.date, booking.endTime)}
                  </div>
                  <div className="booking-item-actions">
                    <div className="booking-item-price">
                      ₹{booking.totalPrice}
                    </div>
                    {isCancellable && (
                      <button 
                        className="btn-cancel"
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
