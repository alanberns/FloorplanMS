import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlano, updatePlano, deletePlano, getPlanosByProyecto } from '../../api';
import { Plano } from "../../types";
import { showErrorAlert, showSuccessAlert } from "../../alerts";
import Swal from 'sweetalert2';
import PlanoForm from './PlanoForm';
import { useParams } from 'react-router-dom';
import { Spinner, Button, Table, Container } from 'react-bootstrap';
import withReactContent from 'sweetalert2-react-content';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthContext } from '../auth/AuthContext';

const MySwal = withReactContent(Swal);
const PlanosList: React.FC = () => {
    const { proyectoId } = useParams<{ proyectoId: string }>();
    const [planos, setPlanos] = useState<Plano[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingPlano, setEditingPlano] = useState<Plano | null>(null);
    const navigate = useNavigate();
    const { getAccessTokenSilently, user } = useAuth0();
    const { userInfo } = useAuthContext();

    
    useEffect(() => {
      const fetchPlanos = async () => {
        try {
          setLoading(true);
          if (!proyectoId) { throw new Error("Proyecto ID no disponible"); }
          const token = await getAccessTokenSilently();
          const data = await getPlanosByProyecto(proyectoId, token);
          setPlanos(data);
        } catch (error) {
          console.error('Error al cargar los planos:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPlanos();
    }, [proyectoId]);
  
    const handleCreate = async (formData: FormData, proyectoId: string) => {
      try {
        setLoading(true);
        formData.append('proyectoId', proyectoId);
        formData.append('usuarioMail', user?.email || '');
        const token = await getAccessTokenSilently();
        const nuevoPlano = await createPlano(formData, token);
        setPlanos([...planos, nuevoPlano]);
        Swal.close();
        showSuccessAlert("El plano ha sido creado");
      } catch (error) {
        console.error('Error al crear plano:', error);
      } finally {
        setLoading(false);
      }
    };
    
    
  
    const handleEdit = async (id: string, data: { nombre: string; especialidad: string; etiquetas?: string[] }) => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const updatedPlano = await updatePlano(id, data, token);
        const existingPlano = planos.find(plano => plano._id === id);
        updatedPlano.archivo = existingPlano?.archivo;
        setPlanos(planos.map(plano => (plano._id === id ? updatedPlano : plano)));
        setEditingPlano(null);
        Swal.close();
        showSuccessAlert("El plano ha sido modificado");
      } catch (error) {
        console.error('Error al actualizar plano:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id: string) => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        await deletePlano(id, token);
        setPlanos(planos.filter(plano => plano._id !== id));
        showSuccessAlert("El plano ha sido eliminado");
      } catch (error) {
        showErrorAlert('Ocurrió un error al eliminar el plano');
      } finally {
        setLoading(false);
      }
    };
   
    const handleShowCreateForm = (proyectoId: string) => {
      MySwal.fire({
        title: 'Crear Plano',
        html: <PlanoForm onSubmit={(data) => handleCreate(data, proyectoId)} isEdit={false} />,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          Swal.close();
        },
      });
    };
    
    
  
    const handleShowEditForm = (plano: Plano) => {
      setEditingPlano(plano);
      MySwal.fire({
        title: 'Modificar Plano',
        html: <PlanoForm initialData={{ ...plano, proyectoId: proyectoId || '' }} onSubmit={(data) => handleEdit(plano._id, data)} isEdit={true} />,
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

    const handleShowFile = (plano: Plano) => {
      const base64String = plano.archivo;
    
      let fileContent;
    
      if (plano.nombreArchivo.endsWith('.pdf')) {
        // Si el archivo es un PDF
        fileContent = `<iframe src="data:application/pdf;base64,${base64String}" width="100%" height="600px"></iframe>`;
      } else {
        // Asumimos que es una imagen si no es un PDF
        fileContent = `<img src="data:image/jpeg;base64,${base64String}" alt="${plano.nombreArchivo}" style="max-width: 100%; height: auto;" />`;
      }
    
      Swal.fire({
        title: `<strong>${plano.nombre}</strong>`,
        html: fileContent,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Cerrar',
      });
    };

    const navigateToHome = () => {
      navigate(`/`);
    };
    
    if (userInfo?.rol !== "Admin" && userInfo?.rol !== "User") { 
      return ( 
      <Container> 
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
          ) : (
            <>
              <h1 className="text-center my-4">Acceso Denegado</h1> 
              <p className="text-center">No tienes permiso para ver esta página.</p> 
              <div className="d-flex justify-content-center mb-3">
                <Button variant="secondary" onClick={() => navigateToHome()} className="me-2">Ir al inicio</Button>
              </div>
            </>
          )}
      </Container> ); 
    }

    return (
        <Container>
          <h1 className="text-center my-4">Planos del Proyecto</h1>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-end mb-3">
                {userInfo?.rol === 'User' && (
                  <Button variant="primary" onClick={() => handleShowCreateForm(proyectoId ? proyectoId : '1')}> Crear Plano </Button> 
                )}
              </div>
              {planos.length === 0 ? (
                <div className="text-center">
                  <p>No se encontraron planos.</p>
                </div>
              ) : (
                <Table striped bordered hover className="rounded">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Especialidad</th>
                      <th>Etiquetas</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planos.map((plano) => (
                      <tr key={plano._id}>
                        <td>{plano.nombre}</td>
                        <td>{plano.especialidad}</td>
                        <td>
                          { plano.etiquetas.map((etiqueta, Ekey) => (
                            <span key={Ekey}>[ {etiqueta} ]</span>
                          )) }
                        </td>
                        <td>
                          <Button variant="secondary" onClick={() => handleShowEditForm(plano)} className="me-2">Modificar</Button>
                          <Button variant="secondary" onClick={() => handleShowFile(plano)} className="me-2">Ver archivo</Button>
                          <Button variant="secondary" onClick={() => handleConfirmDelete(plano._id)} className="me-2">Eliminar</Button>
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
    
export default PlanosList;
      