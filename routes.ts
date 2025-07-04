import { Route } from '../types';
import { locations } from './locations';

const getRandomSeats = () => Math.floor(Math.random() * 50) + 10;
const getRandomPrice = (mode: string, min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRoutes = (from: string, to: string): Route[] => {
  const fromLocation = locations.find(loc => loc.id === from);
  const toLocation = locations.find(loc => loc.id === to);
  
  if (!fromLocation || !toLocation) return [];

  const routes: Route[] = [];

  // Generate flight routes
  const flightTimes = [
    { dept: '06:00', arr: '08:30', duration: '2h 30m' },
    { dept: '09:15', arr: '11:45', duration: '2h 30m' },
    { dept: '14:20', arr: '16:50', duration: '2h 30m' },
    { dept: '18:45', arr: '21:15', duration: '2h 30m' },
  ];

  flightTimes.forEach((time, index) => {
    routes.push({
      id: `flight-${from}-${to}-${index}`,
      from: fromLocation,
      to: toLocation,
      mode: 'flight',
      provider: ['IndiGo', 'SpiceJet', 'Air India', 'Vistara'][index % 4],
      departureTime: time.dept,
      arrivalTime: time.arr,
      duration: time.duration,
      price: getRandomPrice('flight', 3500, 12000),
      seatsAvailable: getRandomSeats(),
      amenities: ['Baggage', 'Meal', 'WiFi'],
      class: 'Economy'
    });
  });

  // Generate train routes
  const trainTimes = [
    { dept: '05:30', arr: '14:45', duration: '9h 15m' },
    { dept: '08:15', arr: '17:30', duration: '9h 15m' },
    { dept: '16:20', arr: '01:35', duration: '9h 15m' },
    { dept: '22:00', arr: '07:15', duration: '9h 15m' },
  ];

  trainTimes.forEach((time, index) => {
    routes.push({
      id: `train-${from}-${to}-${index}`,
      from: fromLocation,
      to: toLocation,
      mode: 'train',
      provider: ['Rajdhani Express', 'Shatabdi Express', 'Duronto Express', 'Gatimaan Express'][index % 4],
      departureTime: time.dept,
      arrivalTime: time.arr,
      duration: time.duration,
      price: getRandomPrice('train', 800, 3500),
      seatsAvailable: getRandomSeats(),
      amenities: ['AC', 'Meals', 'Charging Point'],
      class: ['3A', '2A', '1A', 'CC'][index % 4]
    });
  });

  // Generate bus routes
  const busTimes = [
    { dept: '06:00', arr: '18:00', duration: '12h 00m' },
    { dept: '10:30', arr: '22:30', duration: '12h 00m' },
    { dept: '15:45', arr: '03:45', duration: '12h 00m' },
    { dept: '21:00', arr: '09:00', duration: '12h 00m' },
  ];

  busTimes.forEach((time, index) => {
    routes.push({
      id: `bus-${from}-${to}-${index}`,
      from: fromLocation,
      to: toLocation,
      mode: 'bus',
      provider: ['Volvo', 'RedBus', 'Travels Corp', 'SRS Travels'][index % 4],
      departureTime: time.dept,
      arrivalTime: time.arr,
      duration: time.duration,
      price: getRandomPrice('bus', 500, 2500),
      seatsAvailable: getRandomSeats(),
      amenities: ['AC', 'WiFi', 'Charging Point'],
      class: ['Sleeper', 'Semi-Sleeper', 'AC', 'Volvo'][index % 4]
    });
  });

  return routes;
};