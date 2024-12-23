import { useEffect, useState } from 'react';
import { getProyectos, createProyecto, updateProyecto, deleteProyecto } from '../../api';
import { Proyecto } from "../../types";
import { showErrorAlert, showSuccessAlert } from "../../alerts";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProyectoForm from './ProyectoForm';
import { Spinner, Button, Table, Container } from 'react-bootstrap';
import { useAuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const MySwal = withReactContent(Swal);

function Proyectos() {

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProyecto, setEditingProyecto] = useState<Proyecto | null>(null);
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const data = await getProyectos();
        setProyectos(data);
      } catch (error) {
        showErrorAlert("Ocurrió un error al cargar los proyectos");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  const handleEdit = async (id: string, data: { nombre: string; ubicacion: string, destino: string, obra: string, escala: string }) => {
    try {
      setLoading(true);
      const updatedProyecto = await updateProyecto(id, data);
      setProyectos(proyectos.map(proj => (proj._id === id ? updatedProyecto : proj)));
      setEditingProyecto(null);
      Swal.close();
      showSuccessAlert("El proyecto ha sido modificado");
    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteProyecto(id);
      setProyectos(proyectos.filter(proj => proj._id !== id));
      showSuccessAlert("El proyecto ha sido eliminado");
    } catch (error) {
      showErrorAlert('Ocurrió un error al eliminar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const handleShowEditForm = (proyecto: Proyecto) => {
    setEditingProyecto(proyecto);
    MySwal.fire({
      title: 'Modificar Proyecto',
      html: <ProyectoForm initialData={proyecto} onSubmit={(data) => handleEdit(proyecto._id, data)} />,
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

  const handleShowDetails = (proyecto: Proyecto) => { 
    MySwal.fire({ 
      title: `<strong>${proyecto.expediente}</strong>`, 
      html: ` 
        <div class="card"> 
          <div class="card-body text-start"> 
            <p class="card-text"><strong>Nombre:</strong> ${proyecto.nombre ? proyecto.nombre : "-"}</p> 
            <p class="card-text"><strong>Ubicación:</strong> ${proyecto.ubicacion ? proyecto.ubicacion : "-"}</p> 
            <p class="card-text"><strong>Destino:</strong> ${proyecto.destino ? proyecto.destino : "-"}</p> 
            <p class="card-text"><strong>Obra:</strong> ${proyecto.obra}</p> 
            <p class="card-text"><strong>Aprobado:</strong> ${proyecto.aprobado ? 'Sí' : 'No'}</p> 
            <p class="card-text"><strong>Antecedentes:</strong> ${proyecto.antecedentes ? proyecto.antecedentes : "-"}</p> 
            <p class="card-text"><strong>Propietarios:</strong> ${proyecto.propietario ? proyecto.propietario : "-"}</p> 
            <p class="card-text"><strong>Proyectistas:</strong> ${proyecto.proyectistas ? proyecto.proyectistas : "-"}</p> 
            <p class="card-text"><strong>Dirección técnica:</strong> ${proyecto.direccionTecnica ? proyecto.direccionTecnica : "-"}</p> 
            <p class="card-text"><strong>Otras exigencias:</strong> ${proyecto.otrasExigencias ? proyecto.otrasExigencias : "-"}</p> 
          </div>
        </div> `,
      showCancelButton: false,
      showConfirmButton: true, 
      confirmButtonText: 'Volver', 
    });
  };

  const navigateToHome = () => {
    navigate(`/`);
  };

  if (userInfo?.role !== "Admin") { 
    return ( 
    <Container> 
      <h1 className="text-center my-4">Acceso Denegado</h1> 
      <p className="text-center">No tienes permiso para ver esta página.</p> 
      <div className="d-flex justify-content-center mb-3">
        <Button variant="secondary" onClick={() => navigateToHome()} className="me-2">Ir al inicio</Button>
      </div>
    </Container> ); 
  }
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
              <p>No se encontraron proyectos.</p>
            </div>
          ) : (
            <Table striped bordered hover className="rounded">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Expediente</th>
                  <th>Aprobación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto) => (
                  <tr key={proyecto._id}>
                    <td>{proyecto.nombre}</td>
                    <td>{proyecto.expediente}</td>
                    <td>{proyecto.aprobado ? 'Sí' : 'No'}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleShowEditForm(proyecto)} className="me-2">Modificar</Button>
                      <Button variant="secondary" onClick={() => handleConfirmDelete(proyecto._id)} className="me-2">Eliminar</Button>
                      <Button variant="secondary" onClick={() => handleShowDetails(proyecto)} className="me-2">Ver detalles</Button>
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

export default Proyectos;
