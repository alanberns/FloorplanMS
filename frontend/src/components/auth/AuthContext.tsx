import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { checkLogin } from '../../api';
import { showErrorAlert } from '../../alerts';

interface AuthContextProps {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  verifyUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  userInfo: null,
  setUserInfo: () => {},
  verifyUser: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0();
  const [userInfo, setUserInfo] = useState<any>(null);

  const verifyUser = async () => {
    if (isAuthenticated && user) {
      try {
        const token = await getAccessTokenSilently();
        const data = await checkLogin(user.email || '', token);

        if (!data.exists) {
          showErrorAlert("Usuario no registrado o inactivo. Cerrando sesión...");
          setTimeout(() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
          }, 2000);
        } else {
          setUserInfo(data); // Guardar la información del usuario en el estado del contexto
          console.log("Datos obtenidos: ", data); // Añadir log para verificar los datos
        }
      } catch (error) {
        console.error('Error al verificar el usuario en la base de datos:', error);
        showErrorAlert("Error al verificar el usuario en la base de datos");
        setTimeout(() => {
          logout({ logoutParams: { returnTo: window.location.origin } });
        }, 2000);
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, [isAuthenticated, user, getAccessTokenSilently, logout]);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
