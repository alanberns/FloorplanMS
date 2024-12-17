import { useEffect, useState } from 'react';
import { getUsuarios, createUsuario, deleteUsuario } from '../../api'; 
import { Usuario } from "../../types";
import { showErrorAlert, showSuccessAlert } from "../../alerts";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UsuarioForm from './UsuarioForm';
import { Spinner, Button, Container, Table } from 'react-bootstrap';

const MySwal = withReactContent(Swal);

function Usuarios() {
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        showErrorAlert("Ocurrió un error al cargar los usuarios");
      } finally {
        setLoading(false);
      }    
    };

    fetchUsuarios();
  }, []);

  const handleCreate = async (data: { nombre: string; apellido: string; email: string }) => {
    try {
      setLoading(true);
      const nuevoUsuario = await createUsuario(data);
      setUsuarios([...usuarios, nuevoUsuario]);
      Swal.close();
      showSuccessAlert("El usuario ha sido creado");
    } catch (error) {
      showErrorAlert("Error al crear usuario");
      console.error('Error al crear usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteUsuario(id);
      setUsuarios(usuarios.filter(user => user._id !== id));
      showSuccessAlert("El usuario ha sido eliminado");
    } catch (error) {
      showErrorAlert('Ocurrió un error al eliminar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleShowCreateForm = () => {
    MySwal.fire({
      title: 'Crear Usuario',
      html: <UsuarioForm onSubmit={handleCreate} />,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        Swal.close();
      },
    });
  };

  const handleConfirmDelete = (id: string) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
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
            <Button variant="primary" onClick={handleShowCreateForm}>Crear Usuario</Button>
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
                      <Button variant="danger" onClick={() => handleConfirmDelete(usuario._id)} className="me-2">Eliminar</Button>
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
}

export default Usuarios;
