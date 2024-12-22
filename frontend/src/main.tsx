import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-yaeu8k0rezjen3al.us.auth0.com";
const clientId = "9iZdF8Fd7HDF4AtUylZoOzEP2s9CAqi0";

interface AppState { returnTo?: string; }

const onRedirectCallback = (appState?: AppState) => { window.history.replaceState({}, document.title, appState?.returnTo || window.location.pathname); };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain = {domain}
      clientId = {clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{ 
        redirect_uri: window.location.origin + '/redirect',
        audience: 'http://localhost:3000',
        scope: "read:current_user update:current_user_metadata profile email"
      }}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </StrictMode>,
)