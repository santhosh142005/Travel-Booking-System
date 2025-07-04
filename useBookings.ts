import { useState, useEffect } from 'react';
import { Booking } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedBookings = localStorage.getItem('travelBookings');
      if (savedBookings) {
        const allBookings = JSON.parse(savedBookings);
        const userBookings = allBookings.filter((booking: Booking) => booking.userId === user.id);
        setBookings(userBookings);
      }
    } else {
      setBookings([]);
    }
  }, [user]);

  const addBooking = (booking: Omit<Booking, 'userId'>) => {
    if (!user) return;
    
    const newBooking = { ...booking, userId: user.id };
    
    // Get all bookings from localStorage
    const savedBookings = localStorage.getItem('travelBookings');
    const allBookings = savedBookings ? JSON.parse(savedBookings) : [];
    
    // Add new booking
    const updatedAllBookings = [...allBookings, newBooking];
    localStorage.setItem('travelBookings', JSON.stringify(updatedAllBookings));
    
    // Update user's bookings
    const userBookings = updatedAllBookings.filter((b: Booking) => b.userId === user.id);
    setBookings(userBookings);
    
    // Auto-approve after 1 minute
    setTimeout(() => {
      updateBookingStatus(newBooking.id, 'confirmed');
    }, 60000);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    if (!user) return;
    
    // Get all bookings from localStorage
    const savedBookings = localStorage.getItem('travelBookings');
    const allBookings = savedBookings ? JSON.parse(savedBookings) : [];
    
    // Update the specific booking
    const updatedAllBookings = allBookings.map((booking: Booking) => 
      booking.id === bookingId ? { ...booking, status } : booking
    );
    localStorage.setItem('travelBookings', JSON.stringify(updatedAllBookings));
    
    // Update user's bookings
    const userBookings = updatedAllBookings.filter((b: Booking) => b.userId === user.id);
    setBookings(userBookings);
  };

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  const getBookingById = (bookingId: string) => {
    return bookings.find(booking => booking.id === bookingId);
  };

  return {
    bookings,
    addBooking,
    cancelBooking,
    getBookingById,
    updateBookingStatus
  };
};