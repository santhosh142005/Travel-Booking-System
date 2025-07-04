import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Clock } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { RouteCard } from './components/RouteCard';
import { BookingForm } from './components/BookingForm';
import { BookingCard } from './components/BookingCard';
import { AuthModal } from './components/AuthModal';
import { UserMenu } from './components/UserMenu';
import { ThemeToggle } from './components/ThemeToggle';
import { SearchParams, Route, BookingFormData, Booking } from './types';
import { generateRoutes } from './data/routes';
import { useBookings } from './hooks/useBookings';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

type ViewMode = 'search' | 'results' | 'booking' | 'tickets';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewMode>('search');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedReturnRoute, setSelectedReturnRoute] = useState<Route | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { bookings, addBooking, cancelBooking } = useBookings();
  const { user } = useAuth();

  const handleSearch = (params: SearchParams) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setSearchParams(params);
    const foundRoutes = generateRoutes(params.from!.id, params.to!.id);
    const filteredRoutes = params.travelMode === 'all' 
      ? foundRoutes 
      : foundRoutes.filter(route => route.mode === params.travelMode);
    setRoutes(filteredRoutes);
    setCurrentView('results');
  };

  const handleBookRoute = (route: Route) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setSelectedRoute(route);
    setCurrentView('booking');
  };

  const handleBookingSubmit = (formData: BookingFormData) => {
    const now = new Date();
    const booking: Omit<Booking, 'userId'> = {
      id: `booking-${Date.now()}`,
      route: formData.route,
      returnRoute: formData.returnRoute,
      passengers: formData.passengers,
      totalCost: (formData.route.price + (formData.returnRoute?.price || 0)) * formData.passengers.length,
      status: 'pending',
      bookingDate: now.toLocaleDateString(),
      bookingTime: now.toLocaleTimeString(),
      pnr: `PNR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      paymentMethod: formData.paymentMethod
    };

    addBooking(booking);
    setCurrentView('tickets');
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const renderHeader = () => (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TravelBooker</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-6">
              <button
                onClick={() => setCurrentView('search')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'search' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Search
              </button>
              {user && (
                <button
                  onClick={() => setCurrentView('tickets')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'tickets' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  My Bookings ({bookings.length})
                </button>
              )}
            </nav>
            <ThemeToggle />
            {user ? (
              <UserMenu onViewBookings={() => setCurrentView('tickets')} />
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'search':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Book Your Perfect Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Compare and book trains, buses, and flights across India
              </p>
            </div>
            <SearchForm onSearch={handleSearch} />
          </div>
        );

      case 'results':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {searchParams?.from?.name} → {searchParams?.to?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {routes.length} options found for {searchParams?.passengers} passenger{searchParams?.passengers !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setCurrentView('search')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
              >
                Modify Search
              </button>
            </div>
            <div className="space-y-4">
              {routes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  onBook={handleBookRoute}
                />
              ))}
            </div>
          </div>
        );

      case 'booking':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => setCurrentView('results')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                ← Back to Results
              </button>
            </div>
            {selectedRoute && (
              <BookingForm
                route={selectedRoute}
                returnRoute={selectedReturnRoute}
                passengers={searchParams?.passengers || 1}
                onSubmit={handleBookingSubmit}
                onCancel={() => setCurrentView('results')}
              />
            )}
          </div>
        );

      case 'tickets':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h2>
              <button
                onClick={() => setCurrentView('search')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Booking
              </button>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Start your journey by searching for tickets</p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={cancelBooking}
                  />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {renderHeader()}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;