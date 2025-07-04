import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Ticket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  onViewBookings: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onViewBookings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleViewBookings = () => {
    onViewBookings();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:block">{user?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
          
          <button
            onClick={handleViewBookings}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Ticket className="w-4 h-4" />
            My Bookings
          </button>
          
          <button
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};