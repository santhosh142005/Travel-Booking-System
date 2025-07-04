import React from 'react';
import { Clock, MapPin, Plane, Train, Bus, Users } from 'lucide-react';
import { Route } from '../types';

interface RouteCardProps {
  route: Route;
  onBook: (route: Route) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onBook }) => {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'flight': return <Plane className="w-5 h-5 text-blue-600" />;
      case 'train': return <Train className="w-5 h-5 text-green-600" />;
      case 'bus': return <Bus className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'flight': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'train': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'bus': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      default: return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className={`border rounded-lg p-6 hover:shadow-lg transition-shadow ${getModeColor(route.mode)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getModeIcon(route.mode)}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{route.provider}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{route.mode} • {route.class}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{route.price}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{route.departureTime}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{route.from.code}</p>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-sm text-gray-600 dark:text-gray-400">{route.duration}</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{route.arrivalTime}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{route.to.code}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{route.seatsAvailable} seats available</span>
          </div>
          <div className="flex gap-2">
            {route.amenities.map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => onBook(route)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};