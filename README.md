# WanderWise - AI-Powered Travel Planning App

![WanderWise Logo](/logo.svg)

WanderWise is a modern travel planning application that uses AI to generate personalized trip itineraries based on user preferences. The app features user authentication, trip creation, and management capabilities.

## Features

- 🚀 **AI-Powered Trip Generation**: Get customized travel plans in seconds
- 🔐 **Google Authentication**: Secure login with Google OAuth
- 📅 **Trip Management**: Create, view, and organize your travel plans
- 🏨 **Comprehensive Itineraries**: Includes places to visit, hotels, and activities
- 💰 **Budget Planning**: Create trips based on your budget level
- 👥 **Group Size Options**: Plan for solo travelers or groups


### Core Stack
- **React** (Vite) - Frontend framework
- **TypeScript** - Type checking
- **Firebase** - Backend services:
  - Firestore (Database)
  - Authentication (via Google OAuth)
- **Google Gemini AI** - Trip itinerary generation
- **Tailwind CSS** - Styling

### Key Libraries
- **React Router** - Navigation
- **React OAuth Google** - Authentication
- **Sonner** - Toast notifications
- **React Select** - Custom form inputs
- **React Icons** - Icon set
- **Date-fns** (or similar) - Date handling

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install @google/genai mime @react-oauth/google react-router-dom sonner react-select react-icons date-fns firebase
```
## Code Structure 
src/
├── assets/               # Static assets
├── components/           # Reusable UI components
├── constants/            # Constant data/options
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Authentication logic
│   └── useCreateTripForm.ts # Trip form management
├── pages/                # Page components
│   ├── Home/             # Landing page
│   ├── CreateTrip/       # Trip creation flow
│   ├── MyTrips/          # User trips dashboard
│   └── ViewTrip/         # Single trip view
├── service/              # External services
│   ├── AIModal.ts        # AI integration
│   └── FirebaseConfig.ts # Firebase setup
├── types/                # Type definitions
└── utils/                # Utility functions


## Available Scripts
```bash 
npm run dev    # Start development server
npm run build  # Production build
npm run preview  # Preview production build
```

## License

This README provides a comprehensive overview of your project, including:
- Key features
- Component descriptions
- Hook functionality
- Service implementations
- Installation instructions
- Project structure
- Configuration requirements

You may want to customize the Firebase configuration details and add any additional deployment instructions specific to your setup. The structure follows common React project conventions and clearly documents all the major parts of your application.