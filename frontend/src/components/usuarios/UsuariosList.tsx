import React, { useEffect, useState } from 'react';
import { Usuario } from "../../types";
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Spinner, Container } from 'react-bootstrap';
import { getUsuariosByOrganizacion, removeUsuarioFromOrganizacion } from '../../api';
import { showErrorAlert, showSuccessAlert } from "../../alerts";

interface UsuariosListProps {
    orgId: string;
  }
  
  const UsuariosList: React.FC<UsuariosListProps> = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const usuarios = await getUsuariosByOrganizacion(orgId);
        setUsuarios(usuarios);
      } catch (error) {
        showErrorAlert('Ocurrió un error al cargar los usuarios de la organización');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [orgId]);

  const handleRemoveUsuario = async (usuarioId: string) => {
    try {
      setLoading(true);
      await removeUsuarioFromOrganizacion(orgId, usuarioId);
      setUsuarios(usuarios.filter(usuario => usuario._id !== usuarioId));
      showSuccessAlert("El usuario ha sido eliminado de la organización");
    } catch (error) {
      showErrorAlert('Ocurrió un error al eliminar el usuario de la organización');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <h1 className="text-center my-4">Usuarios</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-3">
          <Button variant="secondary" className="mb-3" onClick={() => navigate('/organizaciones')}> Volver </Button>
          </div>
          {usuarios.length === 0 ? (
            <div className="text-center">
              <p>No hay usuarios registrados.</p>
            </div>
          ) : (
            <Table striped bordered hover className="rounded">
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                    <tr key={usuario._id}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.apellido}</td>
                        <td>{usuario.email}</td>
                        <td>
                        <Button variant="secondary" className="me-2" onClick={() => handleRemoveUsuario(usuario._id)}>Eliminar</Button>
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

export default UsuariosList;