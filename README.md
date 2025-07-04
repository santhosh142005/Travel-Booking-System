# Travel Booking System

A complete travel booking platform for trains, buses, and flights across India. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Smart Search**: Search and compare trains, buses, and flights
- 👤 **User Authentication**: Secure login and registration system
- 🎫 **Booking Management**: Complete booking flow with passenger details
- 💳 **Payment Integration**: Multiple payment methods (Card, UPI, Wallet)
- 📱 **Responsive Design**: Works perfectly on all devices
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📊 **Booking History**: Track all your bookings with real-time status updates

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API
- **Storage**: Local Storage (for demo purposes)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/travel-booking-system.git
cd travel-booking-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

5. ## Project Structure
│   ├── SearchForm.tsx  # Main search form
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   └── UserMenu.tsx    # User dropdown menu
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state management
│   └── ThemeContext.tsx # Theme state management
├── data/              # Static data and generators
│   ├── locations.ts   # Indian cities and locations
│   └── routes.ts      # Route generation logic
├── hooks/             # Custom React hooks
│   └── useBookings.ts # Booking management hook
├── types/             # TypeScript type definitions
│   └── index.ts       # All application types
└── App.tsx            # Main application component
```

##Features in Detail

### Authentication System
- Email/password registration and login
- Persistent sessions using localStorage
- Protected routes requiring authentication
- User profile management

### Search & Booking
- Multi-modal transport search (trains, buses, flights)
- Real-time availability and pricing
- Passenger information collection
- Multiple payment method support
- Booking confirmation and PNR generation

### User Experience
- Responsive design for all screen sizes
- Dark/light theme toggle
- Smooth animations and transitions
- Intuitive navigation and user flows
- Real-time booking status updates
## Demo Credentials

For testing purposes, you can create a new account or use these demo features:
- Registration is instant with email validation
- Bookings are automatically confirmed after 1 minute
- All data is stored locally in your browser

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

## Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Travel+Booking+Home)

### Search Results
![Search Results](https://via.placeholder.com/800x400?text=Search+Results)

### Booking Form
![Booking Form](https://via.placeholder.com/800x400?text=Booking+Form)

### User Dashboard
![User Dashboard](https://via.placeholder.com/800x400?text=User+Dashboard)
