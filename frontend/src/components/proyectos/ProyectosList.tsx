import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProyectosByOrganizacion } from '../../api';
import { Proyecto } from "../../types";
import { Spinner, Table, Container, Button } from 'react-bootstrap';

interface ProyectosListProps {
    orgId: string;
  }

const ProyectosList: React.FC<ProyectosListProps> = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setLoading(true);
        const data = await getProyectosByOrganizacion(orgId);
        setProyectos(data);
      } catch (error) {
        console.error('Error al cargar los proyectos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, [orgId]);


  return (
    <Container>
      <h1 className="text-center my-4">Proyectos</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {proyectos.length === 0 ? (
            <div className="text-center">
              <p>No hay proyectos registrados para esta organización.</p>
            </div>
          ) : (
            <Table striped bordered hover className="rounded">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Expediente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto) => (
                  <tr key={proyecto._id}>
                    <td>{proyecto.nombre}</td>
                    <td>{proyecto.expediente}</td>
                    <td>
                      <Button variant="primary" onClick={() => alert(`Ver detalles de ${proyecto.nombre}`)}>
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
};

export default ProyectosList;
