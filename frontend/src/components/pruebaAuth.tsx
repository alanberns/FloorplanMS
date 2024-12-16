import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const PruebaAuth: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("Resultado");
      console.log(data);
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default PruebaAuth;
