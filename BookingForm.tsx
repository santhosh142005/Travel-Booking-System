import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Route, BookingFormData, Passenger } from '../types';

interface BookingFormProps {
  route: Route;
  returnRoute?: Route;
  passengers: number;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  route,
  returnRoute,
  passengers,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    route,
    returnRoute,
    passengers: Array.from({ length: passengers }, (_, i) => ({
      id: `passenger-${i + 1}`,
      name: '',
      age: 25,
      gender: 'male'
    })),
    contactEmail: '',
    contactPhone: '',
    paymentMethod: 'card'
  });

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updatedPassengers = [...formData.passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setFormData(prev => ({ ...prev, passengers: updatedPassengers }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const totalCost = (route.price + (returnRoute?.price || 0)) * passengers;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Booking Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Passenger Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Passenger Details</h3>
          {formData.passengers.map((passenger, index) => (
            <div key={passenger.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Passenger {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={passenger.name}
                    onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
                <input
                  type="number"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  min="1"
                  max="100"
                  required
                />
                <select
                  value={passenger.gender}
                  onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.contactEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.contactPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
              className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                formData.paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-gray-900 dark:text-white">Credit/Debit Card</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
              className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                formData.paymentMethod === 'upi'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span className="text-gray-900 dark:text-white">UPI Payment</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'wallet' }))}
              className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                formData.paymentMethod === 'wallet'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span className="text-gray-900 dark:text-white">Digital Wallet</span>
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Route:</span>
              <span className="text-gray-900 dark:text-white">{route.from.name} → {route.to.name}</span>
            </div>
            {returnRoute && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Return Route:</span>
                <span className="text-gray-900 dark:text-white">{returnRoute.from.name} → {returnRoute.to.name}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Passengers:</span>
              <span className="text-gray-900 dark:text-white">{passengers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
              <span className="text-gray-900 dark:text-white">₹{route.price} {returnRoute && `+ ₹${returnRoute.price}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 dark:border-gray-600 pt-2">
              <span className="text-gray-900 dark:text-white">Total Amount:</span>
              <span className="text-gray-900 dark:text-white">₹{totalCost}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-900 dark:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};