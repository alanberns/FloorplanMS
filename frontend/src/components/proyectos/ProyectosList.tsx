import React, { useEffect, useState } from 'react';
import { createProyecto, updateProyecto, deleteProyecto, getProyectosByOrganizacion, getOrganizacionById, toggleAprobado } from '../../api';
import { Organizacion, Proyecto } from "../../types";
import { showErrorAlert, showSuccessAlert } from "../../alerts";
import Swal from 'sweetalert2';
import ProyectoForm from './ProyectoForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Button, Table, Container } from 'react-bootstrap';
import withReactContent from 'sweetalert2-react-content';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthContext } from '../auth/AuthContext';


const MySwal = withReactContent(Swal);

const ProyectosList: React.FC = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [organizacion, setOrganizacion] = useState<Organizacion>();
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProyecto, setEditingProyecto] = useState<Proyecto | null>(null);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { userInfo } = useAuthContext();

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setLoading(true);
        if (!orgId) { throw new Error("Organización ID no disponible"); }
        const token = await getAccessTokenSilently(); 
        const data = await getProyectosByOrganizacion(orgId,token);
        setProyectos(data);
        const dataOrg = await getOrganizacionById(orgId,token);
        setOrganizacion(dataOrg);
      } catch (error) {
        console.error('Error al cargar los proyectos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, [orgId]);

  const handleCreate = async (data: {
    nombre: string;
    ubicacion: string;
    destino: string;
    obra: string;
    escala: string;
    otrasExigencias: string;
    antecedentes: string;
    propietario: string;
    proyectistas: string;
    direccionTecnica: string;
    aprobado: boolean;
    organizacionId: string;
  }) => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently(); 
      const nuevoProyecto = await createProyecto(data,token);
      setProyectos([...proyectos, nuevoProyecto]);
      Swal.close();
      showSuccessAlert("El proyecto ha sido creado");
    } catch (error) {
      console.error('Error al crear proyecto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string, data: {
    nombre: string,
    ubicacion: string,
    destino: string,
    obra: string,
    escala: string,
    otrasExigencias: string,
    antecedentes: string,
    propietario: string,
    proyectistas: string,
    direccionTecnica: string,
    aprobado: boolean,
  }) => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently(); 
      const updatedProyecto = await updateProyecto(id, data, token);
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
      const token = await getAccessTokenSilently(); 
      await deleteProyecto(id, token);
      setProyectos(proyectos.filter(proj => proj._id !== id));
      showSuccessAlert("El proyecto ha sido eliminado");
    } catch (error) {
      showErrorAlert('Ocurrió un error al eliminar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const handleShowCreateForm = () => {
    console.log("handle show create form");
    MySwal.fire({
      title: 'Crear Proyecto',
      html: <ProyectoForm onSubmit={(data) => handleCreate({ ...data, organizacionId: orgId || '' })} />,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        Swal.close();
      },
    });
  };

  const handleShowEditForm = (proyecto: Proyecto) => {
    setEditingProyecto(proyecto);
    MySwal.fire({
      title: 'Modificar Proyecto',
      html: <ProyectoForm initialData={{ ...proyecto, organizacionId: orgId || '' }} onSubmit={(data) => handleEdit(proyecto._id, data)} />,
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

  const handleToggleApprove = async (proyectoId: string, aprobado: boolean) => {
    try {
      const token = await getAccessTokenSilently(); 
      await toggleAprobado(proyectoId, { aprobado }, token);
      setProyectos(proyectos.map(proj => (proj._id === proyectoId ? { ...proj, aprobado } : proj))); // Actualiza el estado local
      aprobado? showSuccessAlert("El proyecto fue aprobado") : showSuccessAlert("El proyecto fue desaprobado");
    } catch (error) {
      console.error('Error al modificar el estado del proyecto:', error);
      showErrorAlert("Hubo un problema al actualizar el proyecto");
    }
  }

  const handleShowPlanos = (proyectoId: string) => {
    navigate(`/proyectos/${proyectoId}/planos`);
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
      <h1 className="text-center my-4">Proyectos - {organizacion?.nombre}</h1>
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
              <Button variant="primary" onClick={handleShowCreateForm}>Crear Proyecto</Button>
            )}
          </div>
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
                      <Button variant="secondary" onClick={() => handleShowPlanos(proyecto._id)} className="me-2">Ver planos</Button>
                      <Button variant="secondary" onClick={() => handleToggleApprove(proyecto._id, !proyecto.aprobado)} className="me-2" > {proyecto.aprobado ? 'Desaprobar' : 'Aprobar'} </Button>
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
