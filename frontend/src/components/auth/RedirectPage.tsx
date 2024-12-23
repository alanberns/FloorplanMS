import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext'; // Asegúrate de ajustar la ruta según corresponda

const RedirectPage = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { userInfo, verifyUser } = useAuthContext(); // Usar el contexto para obtener y verificar la información del usuario

  useEffect(() => {
    const verifyAndRedirect = async () => {
      await verifyUser();
      if (userInfo) {
        console.log("Usuario info: ", userInfo);
        navigate(userInfo.rol === "Admin" ? '/usuarios' : '/');
      }
    };

    verifyAndRedirect();
  }, [isAuthenticated, userInfo, navigate, verifyUser]);

  return <div>Verificando usuario...</div>;
};

export default RedirectPage;
