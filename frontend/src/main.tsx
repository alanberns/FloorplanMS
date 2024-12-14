import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-yaeu8k0rezjen3al.us.auth0.com";
const clientId = "9iZdF8Fd7HDF4AtUylZoOzEP2s9CAqi0";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain = {domain}
      clientId = {clientId}
      authorizationParams={{ 
        redirect_uri: window.location.origin
      }}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </StrictMode>,
)