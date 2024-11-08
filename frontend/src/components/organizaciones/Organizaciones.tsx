import { useEffect, useState } from 'react';
import { getOrganizaciones, createOrganizacion, updateOrganizacion, deleteOrganizacion } from '../../api'; 
import { Organizacion } from "../../types";
import { showErrorAlert, showSuccessAlert } from "../../alerts";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import OrganizacionForm from './OrganizacionForm';
import { Spinner, Button, Card, Container } from 'react-bootstrap';


const MySwal = withReactContent(Swal);

function Organizaciones() {
  
  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [editingOrganizacion, setEditingOrganizacion] = useState<Organizacion | null>(null);
  
  useEffect(() => {
    const fetchOrganizaciones = async () => {
      try {
        const data = await getOrganizaciones();
        setOrganizaciones(data);
      } catch (error) {
        showErrorAlert("ocurrio un error al cargar las organizaciones");
      } finally {
        setLoading(false);
      }    
    };

    fetchOrganizaciones();
  }, []);

  const handleCreate = async (data: { nombre: string; direccion: string; contacto: string }) => {
    try {
      setLoading(true);
      const nuevaOrganizacion = await createOrganizacion(data);
      setOrganizaciones([...organizaciones, nuevaOrganizacion]);
      Swal.close();
      showSuccessAlert("La organización ha sido creada");
    } catch (error) {
      console.error('Error al crear organización:', error);
    } finally {
      setLoading(false);
    }  
  };

  const handleEdit = async (id: string, data: { nombre: string; direccion: string; contacto: string }) => {
    try {
      setLoading(true);
      const updatedOrganizacion = await updateOrganizacion(id, data);
      setOrganizaciones(organizaciones.map(org => (org._id === id ? updatedOrganizacion : org)));
      setEditingOrganizacion(null);
      Swal.close();
      await new Promise(resolve => setTimeout(resolve, 3000));
      showSuccessAlert("La organización ha sido modificada");
    } catch (error) {
      console.error('Error al actualizar organización:', error);
    } finally {
      setLoading(false);
    }  
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteOrganizacion(id);
      setOrganizaciones(organizaciones.filter(org => org._id !== id));
      showSuccessAlert("La organización ha sido eliminada");
    } catch (error) {
      showErrorAlert('Ocurrió un error al eliminar la organización');
    } finally {
      setLoading(false);
    }  
  };

  const handleShowCreateForm = () => {
    MySwal.fire({
      title: 'Crear Organización',
      html: <OrganizacionForm onSubmit={handleCreate} />,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        Swal.close();
      },
    });
  };

  const handleShowEditForm = (organizacion: Organizacion) => {
    setEditingOrganizacion(organizacion);
    MySwal.fire({
      title: 'Modificar Organización',
      html: <OrganizacionForm initialData={organizacion} onSubmit={(data) => handleEdit(organizacion._id, data)} />,
      showConfirmButton: false,
      showCancelButton: true,
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
      <h1 className="text-center my-4">Organizaciones</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={handleShowCreateForm}>Crear Organización</Button>
          </div>
          <ul className="list-unstyled">
            {organizaciones.map((organizacion) => (
              <Card key={organizacion._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{organizacion.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Dirección:</strong> {organizacion.direccion}<br />
                    <strong>Contacto:</strong> {organizacion.contacto}
                  </Card.Text>
                  <Button variant="warning" onClick={() => handleShowEditForm(organizacion)}>Modificar</Button>{' '}
                  <Button variant="danger" onClick={() => handleConfirmDelete(organizacion._id)}>Eliminar</Button>
                </Card.Body>
              </Card>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
export default Organizaciones;