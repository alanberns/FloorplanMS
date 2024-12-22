import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { checkLogin } from '../../api';
import { showErrorAlert } from '../../alerts';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserInDatabase = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const data = await checkLogin(user.email || '', token);

          if (!data.exists) {
            showErrorAlert("Usuario no registrado. Cerrando sesión...");
            setTimeout(() => {
              logout({ logoutParams: { returnTo: window.location.origin }});
            }, 2000);
          } else {
            navigate('/'); // Redirigir a la página principal si el usuario existe
          }
        } catch (error) {
          console.error('Error al verificar el usuario en la base de datos:', error);
          showErrorAlert("Error al verificar el usuario en la base de datos");
          setTimeout(() => {
            logout({ logoutParams: { returnTo: window.location.origin }});
          }, 2000);
        }
      }
    };

    checkUserInDatabase();
  }, [isAuthenticated, user, getAccessTokenSilently, logout, navigate]);

  return <div>Verificando usuario...</div>;
};

export default RedirectPage;
