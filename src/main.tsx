import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './components/create-trip/CreateTrip.jsx'
import Header from './components/custom/Header.js'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './components/tripDetails/[TRIP_ID]/viewTrip'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,

  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip />
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <Header />
    <Toaster />
    <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </React.StrictMode>,
)
