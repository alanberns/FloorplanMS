import React, { useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';

const LoadingComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); // Simula una operación de carga
  };

  return (
    <div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        <Button onClick={handleButtonClick}>Mostrar Spinner</Button>
      )}
    </div>
  );
};

export default LoadingComponent;