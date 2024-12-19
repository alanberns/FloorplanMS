import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrganizaciones, createOrganizacion, updateOrganizacion, deleteOrganizacion, getUsuariosNoAsignados, addUsuarioToOrganizacion } from '../../api';
import { Organizacion, Usuario } from "../../types";
import { showErrorAlert, showSuccessAlert } from "../../alerts";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import OrganizacionForm from './OrganizacionForm';
import { Spinner, Button, Container, Table } from 'react-bootstrap';

const MySwal = withReactContent(Swal);

function Organizaciones() {

  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingOrganizacion, setEditingOrganizacion] = useState<Organizacion | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizaciones = async () => {
      try {
        const data = await getOrganizaciones();
        setOrganizaciones(data);
      } catch (error) {
        showErrorAlert("Ocurrió un error al cargar las organizaciones");
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
      showErrorAlert('Error al crear organización');
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
      showSuccessAlert("La organización ha sido modificada");
    } catch (error) {
      console.error('Error al actualizar organización:', error);
      showErrorAlert('Error al actualizar organización');
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

  const handleShowAddUserForm = async (orgId: string) => {
    try {
      setLoading(true);
      const usuarios = await getUsuariosNoAsignados(orgId);
      let filteredUsuarios = usuarios;

      const renderUsuariosList = () => {
        return filteredUsuarios.map((usuario: Usuario) => (
          `<li key="${usuario._id}" class="usuario-item" data-id="${usuario._id}">
            ${usuario.nombre} ${usuario.apellido} (${usuario.email})
            <button class="btn btn-secondary btn-add" data-id="${usuario._id}">Añadir</button>
          </li>`
        )).join('');
      };

      MySwal.fire({
        title: 'Añadir Usuario',
        html: (
          `<div>
            <input id="searchEmail" class="swal2-input" placeholder="Buscar por Email" />
            <ul id="usuariosList" class="swal2-list">
              ${renderUsuariosList()}
            </ul>
          </div>`
        ),
        showCancelButton: false,
        confirmButtonText: 'Cerrar',
        didOpen: () => {
          const searchEmail = document.getElementById('searchEmail') as HTMLInputElement;
          const usuariosList = document.getElementById('usuariosList')!;
          
          searchEmail.addEventListener('input', () => {
            const email = searchEmail.value.toLowerCase();
            filteredUsuarios = usuarios.filter(usuario => usuario.email.toLowerCase().includes(email));
            usuariosList.innerHTML = renderUsuariosList();
          });

          usuariosList.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('btn-add')) {
              const usuarioId = target.getAttribute('data-id');
              try {
                setLoading(true);
                await addUsuarioToOrganizacion(orgId, usuarioId!);
                Swal.close();
                showSuccessAlert("El usuario ha sido añadido a la organización");
              } catch (error) {
                showErrorAlert('Ocurrió un error al añadir el usuario a la organización');
              } finally {
                setLoading(false);
              }
            }
          });
        }
      });
    } catch (error) {
      showErrorAlert('Ocurrió un error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleShowProyectos = (orgId: string) => { 
    navigate(`/organizaciones/${orgId}/proyectos`); 
  };

  const handleShowUsuarios = (orgId: string) => {
    navigate(`/organizaciones/${orgId}/usuarios`);
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
          {organizaciones.length === 0 ? (
            <div className="text-center">
              <p>No hay organizaciones registradas.</p>
            </div>
          ) : (
            <Table striped bordered hover className="rounded">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Contacto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {organizaciones.map((organizacion) => (
                  <tr key={organizacion._id}>
                    <td>{organizacion.nombre}</td>
                    <td>{organizacion.direccion}</td>
                    <td>{organizacion.contacto}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleShowEditForm(organizacion)} className="me-2">Modificar</Button>
                      <Button variant="secondary" onClick={() => handleConfirmDelete(organizacion._id)} className="me-2">Eliminar</Button>
                      <Button variant="secondary" onClick={() => handleShowUsuarios(organizacion._id)} className="me-2">Ver usuarios</Button>
                      <Button variant="secondary" onClick={() => handleShowAddUserForm(organizacion._id)} className="me-2">Añadir usuario</Button>
                      <Button variant="secondary" onClick={() => handleShowProyectos(organizacion._id)} className="me-2">Ver proyectos</Button>
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

export default Organizaciones;
