// Core types for the travel booking system
export interface Location {
  id: string;
  name: string;
  state: string;
  district: string;
  code: string;
}

export interface Route {
  id: string;
  from: Location;
  to: Location;
  mode: 'train' | 'bus' | 'flight';
  provider: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  amenities: string[];
  class?: string;
}

export interface SearchParams {
  from: Location | null;
  to: Location | null;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  travelMode: 'all' | 'train' | 'bus' | 'flight';
  tripType: 'one-way' | 'round-trip';
}

export interface Booking {
  id: string;
  userId: string;
  route: Route;
  returnRoute?: Route;
  passengers: Passenger[];
  totalCost: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
  bookingTime: string;
  pnr: string;
  paymentMethod: string;
}

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email?: string;
  phone?: string;
}

export interface BookingFormData {
  route: Route;
  returnRoute?: Route;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  paymentMethod: 'card' | 'upi' | 'wallet';
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}