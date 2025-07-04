import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Location } from '../types';
import { locations } from '../data/locations';

interface LocationSearchProps {
  placeholder: string;
  value: Location | null;
  onChange: (location: Location | null) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [searchTerm]);

  const handleLocationSelect = (location: Location) => {
    onChange(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={value ? `${value.name}, ${value.state}` : searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{location.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{location.state}, {location.district}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};