import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, Users, Plane, Train, Bus } from 'lucide-react';
import { LocationSearch } from './LocationSearch';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: null,
    to: null,
    departureDate: '',
    returnDate: '',
    passengers: 1,
    travelMode: 'all',
    tripType: 'one-way'
  });

  const handleSwapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchParams.from && searchParams.to && searchParams.departureDate) {
      onSearch(searchParams);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'one-way' }))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            searchParams.tripType === 'one-way' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          One Way
        </button>
        <button
          onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'round-trip' }))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            searchParams.tripType === 'round-trip' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Round Trip
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <LocationSearch
              placeholder="From"
              value={searchParams.from}
              onChange={(location) => setSearchParams(prev => ({ ...prev, from: location }))}
            />
          </div>
          
          <div className="relative">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            
            <LocationSearch
              placeholder="To"
              value={searchParams.to}
              onChange={(location) => setSearchParams(prev => ({ ...prev, to: location }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams(prev => ({ ...prev, departureDate: e.target.value }))}
              min={getTomorrowDate()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          {searchParams.tripType === 'round-trip' && (
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={searchParams.returnDate}
                onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                min={searchParams.departureDate || getTomorrowDate()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          )}

          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={searchParams.passengers}
              onChange={(e) => setSearchParams(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSearchParams(prev => ({ ...prev, travelMode: 'all' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              searchParams.travelMode === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setSearchParams(prev => ({ ...prev, travelMode: 'flight' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              searchParams.travelMode === 'flight' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Plane className="w-4 h-4" />
            Flight
          </button>
          <button
            type="button"
            onClick={() => setSearchParams(prev => ({ ...prev, travelMode: 'train' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              searchParams.travelMode === 'train' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Train className="w-4 h-4" />
            Train
          </button>
          <button
            type="button"
            onClick={() => setSearchParams(prev => ({ ...prev, travelMode: 'bus' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              searchParams.travelMode === 'bus' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Bus className="w-4 h-4" />
            Bus
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Search Tickets
        </button>
      </form>
    </div>
  );
};