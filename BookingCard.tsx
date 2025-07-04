import React from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'cancelled': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">PNR: {booking.pnr}</h3>
          <p className="text-gray-600 dark:text-gray-400">{booking.route.provider}</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
          {getStatusIcon(booking.status)}
          <span className="text-sm font-medium capitalize">{booking.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Journey Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{booking.route.from.name} → {booking.route.to.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{booking.bookingDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{booking.route.departureTime} - {booking.route.arrivalTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{booking.passengers.length} Passenger{booking.passengers.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Passengers</h4>
          <div className="space-y-2 text-sm">
            {booking.passengers.map((passenger, index) => (
              <div key={passenger.id} className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">{passenger.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{passenger.age}Y, {passenger.gender}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{booking.totalCost}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Booked on</p>
            <p className="font-medium text-gray-900 dark:text-white">{booking.bookingDate} at {booking.bookingTime}</p>
          </div>
        </div>

        {booking.status === 'pending' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Your booking is being processed. It will be confirmed automatically in 1 minute.
            </p>
          </div>
        )}

        {booking.status === 'confirmed' && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800 dark:text-green-200">
              Your booking is confirmed! You can download your ticket now.
            </p>
          </div>
        )}

        {onCancel && booking.status !== 'cancelled' && (
          <div className="flex gap-4">
            <button
              onClick={() => onCancel(booking.id)}
              className="px-6 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Cancel Booking
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Download Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};