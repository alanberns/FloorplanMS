import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/', // URL base para todas las solicitudes
  timeout: 10000, // Tiempo máximo de espera
  headers: { 'Content-Type': 'application/json' },
});

// ORGANIZACIONES

// Obtener una organizacion por id
export const getOrganizacionById = async (id: string) => {
  try{
      const response = await api.get(`/organizacion/${id}`);
      return response.data;
  } catch(error) {
      console.error('Error al obtener la organización:', error);
      throw error;
  }
}


// Obtener todas las organizaciones
export const getOrganizaciones = async () => {
  try{
      const response = await api.get('/organizacion');
      return response.data;
  } catch(error) {
      console.error('Error al obtener organizaciones:', error);
      throw error;
  }
}

// Obtener una organizacion
export const getOrganizacion = async (id: string) => {
  try{
      const response = await api.get(`/organizacion/${id}`);
      return response.data;
  } catch(error) {
      console.error('Error al obtener la organizacion:', error);
      throw error;
  }
}

// Crear una nueva organización
export const createOrganizacion = async (data: { nombre: string; direccion: string; contacto: string }) => {
  try {
    const response = await api.post('/organizacion', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear organización:', error);
    throw error;
  }
};

// Actualizar una organización existente
export const updateOrganizacion = async (id: string, data: { nombre: string; direccion: string; contacto: string }) => {
  try {
    const response = await api.put(`/organizacion/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar organización:', error);
    throw error;
  }
};

// Eliminar una organización
export const deleteOrganizacion = async (id: string) => {
  try {
    const response = await api.delete(`/organizacion/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar organización:', error);
    throw error;
  }
};


// PROYECTOS

// Obtener todos los proyectos
export const getProyectos = async () => {
  try{
      const response = await api.get('/proyecto');
      return response.data;
  } catch(error) {
      console.error('Error al obtener proyectos:', error);
      throw error;
  }
}

// Obtener un proyecto
export const getProyecto = async (id: string) => {
  try{
      const response = await api.get(`/proyecto/${id}`);
      return response.data;
  } catch(error) {
      console.error('Error al obtener el proyecto:', error);
      throw error;
  }
}

// Crear un nuevo proyecto
export const createProyecto = async (data: { 
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
    organizacionId: string }) => {
  try {
    const response = await api.post('/proyecto', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    throw error;
  }
};

// Actualizar un proyecto existente
export const updateProyecto = async (id: string, data: {
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
    aprobado: boolean, }) => {
  try {
    const response = await api.patch(`/proyecto/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    throw error;
  }
};

// Eliminar un proyecto
export const deleteProyecto = async (id: string) => {
  try {
    const response = await api.delete(`/proyecto/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    throw error;
  }
};

// Cambiar estado de un proyecto
export const toggleAprobado = async (id: string, data: { aprobado: boolean }) => {
  try {
    const response = await api.patch(`/proyecto/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al modificar proyecto:', error);
    throw error;
  }
}

// Obtener proyectos de una organizacion
export const getProyectosByOrganizacion = async (orgId: string) => {
  const response = await api.get(`/organizacion/${orgId}/proyectos`);
  return response.data;
};


// USUARIOS
export const getUsuarios = async () => {
  const response = await api.get('/usuario');
  return response.data;
};

export const createUsuario = async (data: { nombre: string; apellido: string; email: string }) => {
  const response = await api.post('/usuario', data);
  return response.data;
};

export const updateUsuario = async (id: string, data: Partial<{ isActive: boolean }>) => { 
  const response = await api.patch(`/usuario/${id}`, data); 
  return response.data; 
};

export const deleteUsuario = async (id: string) => {
  const response = await api.delete(`/usuario/${id}`);
  return response.data;
};

// Obtener usuarios de una organizacion
export const getUsuariosByOrganizacion = async (orgId: string) => {
  const response = await api.get(`/organizacion/${orgId}/usuarios`);
  return response.data;
};

// Eliminar usuario de una organizacion
export const removeUsuarioFromOrganizacion = async (orgId: string, usuarioId: string) => { 
  const response = await api.delete(`/organizacion/${orgId}/usuario/${usuarioId}`); 
  return response.data; 
};

// Añadir usuario a organizacion
export const addUsuarioToOrganizacion = async (orgId: string, usuarioId: string) => {
  const response = await api.post(`/organizacion/${orgId}/usuario/${usuarioId}`); 
  return response.data; 
};

//Obtener usuarios que no pertenecen a una organizacion
export const getUsuariosNoAsignados = async (orgId: string) => {
  const response = await api.get(`/organizacion/${orgId}/usuarios-no-asignados`);
  return response.data;
};


//PLANOS

// Obtener planos de un proyecto
export const getPlanosByProyecto = async (proyectoId: string) => {
  const response = await api.get(`/proyecto/${proyectoId}/planos`);
  return response.data;
};

// crear un plano
export const createPlano = async (formData: FormData) => {
  console.log('FormData enviado:', Array.from(formData.entries()));
  try {
    const response = await api.post('/plano', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear plano:', error);
    throw error;
  }
};



// Editar un plano
export const updatePlano = async (id: string, data: {nombre: string; especialidad: string; etiquetas?: string[];}) => {
  const response = await api.patch(`/plano/${id}`, data);
  return response.data;
}

// Eliminar un plano
export const deletePlano = async (id: string) => {
  const response = await api.delete(`/plano/${id}`);
  return response.data;
}

// Verificar si el usuario existe
export const checkLogin = async (userEmail: string, token: string) => {
  const response = await api.post('/usuario/checkLogin',
  { email: userEmail },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Exporta el cliente de Axios para usos adicionales si es necesario
export default api;
